import React, { useEffect, useState } from 'react';
import {
    Typography,
    Box,
    TextField,
    Button,
    Snackbar,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostsCategoryById, updatePostsCategory } from '../../../api/PostsCategoryApi';

const UpdatePostsCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState({
        title: '',
        status: 'true',
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const fetchCategory = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setSnackbarMessage('Token không tồn tại. Vui lòng đăng nhập lại.');
                setOpenSnackbar(true);
                return;
            }
            try {
                const data = await getPostsCategoryById(id, token);
                if (data.status) {
                    setCategory({
                        title: data.data.title || '',
                        slug: data.data.slug || '',
                        status: data.data.status === true || data.data.status === 'true' ? 'true' : 'false',
                    });
                } else {
                    setSnackbarMessage('Không thể lấy chi tiết danh mục: ' + data.message);
                    setOpenSnackbar(true);
                }
            } catch (error) {
                setSnackbarMessage('Lỗi khi lấy chi tiết danh mục: ' + error.message);
                setOpenSnackbar(true);
            }
        };
        fetchCategory();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const payload = {
                ...category,
                status: category.status,
            };
            const data = await updatePostsCategory(id, payload, token);
            if (data.status) {
                setSnackbarMessage('Cập nhật danh mục thành công!');
                setOpenSnackbar(true);
                setTimeout(() => navigate('/admin/PostsCategory/PostsCategory-list'), 1000);
            } else {
                setSnackbarMessage('Không thể cập nhật danh mục: ' + data.message);
                setOpenSnackbar(true);
            }
        } catch (error) {
            setSnackbarMessage('Lỗi khi cập nhật danh mục: ' + (error.response?.data?.message || error.message));
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Cập Nhật Danh Mục Bài Viết
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Tên Danh Mục"
                    name="title"
                    value={category.title}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="status-label">Trạng Thái</InputLabel>
                    <Select
                        labelId="status-label"
                        name="status"
                        value={category.status}
                        label="Trạng Thái"
                        onChange={handleChange}
                    >
                        <MenuItem value="true">Hiển thị</MenuItem>
                        <MenuItem value="false">Ẩn</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" type="submit" sx={{ mr: 2 }}>
                    Cập Nhật
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate('/admin/PostsCategory/PostsCategory-list')}>
                    Quay Lại
                </Button>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Thông báo ở giữa phía trên
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('không thể') || snackbarMessage.toLowerCase().includes('lỗi') ? 'error' : 'success'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UpdatePostsCategory;