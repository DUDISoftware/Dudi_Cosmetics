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
    CircularProgress
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getBannerById, updateBanner } from '../../../api/bannerApi';

const UpdateBanners = () => {
    const { id } = useParams();
    const [banner, setBanner] = useState({
        title: '',
        description: '',
        status: true
    });
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await getBannerById(id, token);
                setBanner({
                    title: data.data?.title || '',
                    description: data.data?.description || '',
                    status: data.data?.status ?? true
                });
                setImagePreview(data.data?.image || null);
            } catch (error) {
                console.error('Lỗi khi tải banner:', error);
                setSnackbarMessage('Không thể tải thông tin banner');
                setOpenSnackbar(true);
            }
        };

        fetchBanner();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setBanner(prev => ({
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

        const maxSize = 5 * 1024 * 1024;
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

        if (!banner.title.trim()) {
            setSnackbarMessage('Vui lòng nhập tiêu đề');
            setOpenSnackbar(true);
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', banner.title.trim());
            formData.append('description', banner.description.trim());
            formData.append('status', banner.status.toString());
            if (file) formData.append('image', file);

            const token = localStorage.getItem('token');
            await updateBanner(id, formData, token);

            setSnackbarMessage('Cập nhật banner thành công!');
            setOpenSnackbar(true);
            setTimeout(() => navigate('/admin/Banners/Banners_list'), 1500);
        } catch (error) {
            console.error('Lỗi:', error);
            setSnackbarMessage(
                error.response?.data?.message || 'Lỗi khi cập nhật banner. Vui lòng thử lại'
            );
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Cập Nhật Banner
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Tiêu đề"
                    name="title"
                    value={banner.title}
                    onChange={handleChange}
                    required
                    error={banner.title.trim() === ''}
                    helperText={banner.title.trim() === '' ? 'Tiêu đề không được để trống' : ''}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Mô tả"
                    name="description"
                    value={banner.description}
                    onChange={handleChange}
                    multiline
                    rows={3}
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
                            checked={banner.status}
                            onChange={handleChange}
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
                        {loading ? <CircularProgress size={24} /> : 'Cập Nhật'}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/admin/Banners/Banners_list')}
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

export default UpdateBanners;
