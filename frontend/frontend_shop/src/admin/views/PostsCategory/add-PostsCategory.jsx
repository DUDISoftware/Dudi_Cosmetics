import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { addPostsCategory } from '../../../api/PostsCategoryApi';

const AddPostsCategory = () => {
    const [category, setCategory] = useState({
        title: '',
        status: 'true', // 'true': Hiển thị, 'false': Ẩn
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({
            ...category,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const payload = {
                ...category,
                status: category.status,
            };
            await addPostsCategory(payload, token);
            setSnackbarMessage('Thêm danh mục bài viết thành công!');
            setOpenSnackbar(true);
            setTimeout(() => navigate('/admin/PostsCategory/PostsCategory-list'), 1200);
        } catch (error) {
            setSnackbarMessage(`Không thể thêm danh mục: ${error.response?.data?.message || error.message}`);
            setOpenSnackbar(true);
        }
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
                    Thêm Danh Mục
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate('/admin/PostsCategory/PostsCategory-list')}>
                    Quay Lại
                </Button>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('Không thể') ? 'error' : 'success'} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddPostsCategory;