import React, { useState, useEffect } from 'react';
import {
    Typography,
    Box,
    TextField,
    Button,
    Snackbar,
    Alert,
    FormControlLabel,
    Switch,
    CircularProgress,
    MenuItem,
    Select,
    InputLabel,
    FormControl
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById, updatePost } from '../../../api/PostsApi';
import { getPostsCategories } from '../../../api/PostsCategoryApi';

const UpdatePosts = () => {
    const { id } = useParams();
    const [post, setPost] = useState({
        title: '',
        description: '',
        content: '',
        status: 'active',
        CategoryP_id: ''
    });
    const [categories, setCategories] = useState([]);
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                // Lấy chi tiết bài viết
                const data = await getPostById(id, token);
                setPost({
                    title: data.data?.title || '',
                    description: data.data?.description || '',
                    content: data.data?.content || '',
                    status: data.data?.status ?? 'active',
                    CategoryP_id: data.data?.CategoryP_id || ''
                });
                setImagePreview(data.data?.image_url || null);

                // Lấy danh mục
                const res = await getPostsCategories(token);
                setCategories(res.data || res);
            } catch (error) {
                setSnackbarMessage('Không thể tải dữ liệu bài viết hoặc danh mục');
                setOpenSnackbar(true);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setPost(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!validTypes.includes(selectedFile.type)) {
            setSnackbarMessage('Chỉ chấp nhận ảnh JPG, PNG, GIF');
            setOpenSnackbar(true);
            return;
        }

        const maxSize = 5 * 1024 * 1024; // 5MB
        if (selectedFile.size > maxSize) {
            setSnackbarMessage('Ảnh không được vượt quá 5MB');
            setOpenSnackbar(true);
            return;
        }

        setFile(selectedFile);
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result);
        reader.readAsDataURL(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!post.title.trim()) {
            setSnackbarMessage('Vui lòng nhập tiêu đề');
            setOpenSnackbar(true);
            return;
        }

        if (!post.CategoryP_id) {
            setSnackbarMessage('Vui lòng chọn danh mục');
            setOpenSnackbar(true);
            return;
        }

        // Lấy user_id từ localStorage
        const user_id = localStorage.getItem('user_id');
        if (!user_id) {
            setSnackbarMessage('Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.');
            setOpenSnackbar(true);
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('user_id', user_id);
            formData.append('title', post.title.trim());
            formData.append('description', post.description.trim());
            formData.append('content', post.content.trim());
            formData.append('status', post.status);
            formData.append('CategoryP_id', post.CategoryP_id);
            if (file) formData.append('image_url', file);

            const token = localStorage.getItem('token');
            await updatePost(id, formData, token);

            setSnackbarMessage('Cập nhật bài viết thành công!');
            setOpenSnackbar(true);
            setTimeout(() => navigate('/admin/Posts/Posts-list '), 1500);
        } catch (error) {
            setSnackbarMessage(error.response?.data?.message || 'Lỗi khi cập nhật bài viết. Vui lòng thử lại');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Cập nhật Bài Viết
            </Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="category-label">Danh mục</InputLabel>
                    <Select
                        labelId="category-label"
                        name="CategoryP_id"
                        value={post.CategoryP_id}
                        label="Danh mục"
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="">
                            <em>Chọn danh mục</em>
                        </MenuItem>
                        {categories.map((cat) => (
                            <MenuItem key={cat._id} value={cat._id}>
                                {cat.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    label="Tiêu đề"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    required
                    error={post.title.trim() === ''}
                    helperText={post.title.trim() === '' ? 'Tiêu đề không được để trống' : ''}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Mô tả"
                    name="description"
                    value={post.description}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Nội dung"
                    name="content"
                    value={post.content}
                    onChange={handleChange}
                    multiline
                    rows={6}
                    sx={{ mb: 2 }}
                />
                <Box sx={{ mb: 2 }}>
                    <Button
                        variant="outlined"
                        component="label"
                        disabled={loading}
                    >
                        Chọn Hình Ảnh
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </Button>
                    {imagePreview && (
                        <Box
                            component="img"
                            src={imagePreview}
                            alt="Preview"
                            sx={{
                                mt: 2,
                                maxHeight: 200,
                                objectFit: 'contain',
                                display: 'block'
                            }}
                        />
                    )}
                </Box>
                <FormControlLabel
                    control={
                        <Switch
                            checked={post.status === 'active'}
                            onChange={e =>
                                setPost(prev => ({
                                    ...prev,
                                    status: prev.status === 'active' ? 'inactive' : 'active'
                                }))
                            }
                            name="status"
                            color="primary"
                        />
                    }
                    label="Trạng thái hoạt động"
                    sx={{ mb: 2 }}
                />
                <Box sx={{ mt: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loading}
                        sx={{ mr: 2 }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Cập nhật Bài Viết'}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/admin/Posts/Posts-list')}
                        disabled={loading}
                    >
                        Quay Lại
                    </Button>
                </Box>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={snackbarMessage.includes('thành công') ? 'success' : 'error'}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UpdatePosts;