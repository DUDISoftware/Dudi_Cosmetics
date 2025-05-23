import React, { useState } from 'react';
import {
    Typography,
    Box,
    TextField,
    Button,
    Snackbar,
    Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddPostsCategory = () => {
    const [category, setCategory] = useState({
        title: '',
        slug: '',
        status: '',
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        fetch('http://localhost:5000/api/PostsCategory/add-PostsCategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(category),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Lỗi! trạng thái: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setSnackbarMessage('Thêm danh mục thành công!');
                setOpenSnackbar(true);
                setTimeout(() => navigate('/admin/PostsCategory-list'), 1000);
            })
            .catch((error) => {
                setSnackbarMessage('Thêm thất bại: ' + error.message);
                setOpenSnackbar(true);
            });
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Thêm Danh Mục Bài Viết
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
                    Thêm Danh Mục
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate('/admin/PostsCategory-list')}>
                    Quay Lại
                </Button>
            </form>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('thất bại') ? 'error' : 'success'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddPostsCategory;