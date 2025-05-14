import React, { useEffect, useState } from 'react';
import {
    Typography,
    Box,
    TextField,
    Button,
    Snackbar,
    Alert,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePostsCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState({
        title: '',
        slug: '',
        status: '',
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:5000/api/PostsCategory/PostsCategory-detail/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) setCategory(data.data);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        fetch(`http://localhost:5000/api/PostsCategory/update-PostsCategory/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(category),
        })
            .then((res) => res.json())
            .then((data) => {
                setSnackbarMessage('Cập nhật danh mục thành công!');
                setOpenSnackbar(true);
                setTimeout(() => navigate('/admin/PostsCategory-list'), 1000);
            })
            .catch((error) => {
                setSnackbarMessage('Cập nhật thất bại: ' + error.message);
                setOpenSnackbar(true);
            });
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
                    label="Tiêu Đề"
                    name="title"
                    value={category.title}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Slug"
                    name="slug"
                    value={category.slug}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Trạng Thái"
                    name="status"
                    value={category.status}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" type="submit" sx={{ mr: 2 }}>
                    Cập Nhật
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate('/admin/PostsCategory-list')}>
                    Quay Lại
                </Button>
            </form>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('thất bại') || snackbarMessage.includes('lỗi') ? 'error' : 'success'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UpdatePostsCategory;