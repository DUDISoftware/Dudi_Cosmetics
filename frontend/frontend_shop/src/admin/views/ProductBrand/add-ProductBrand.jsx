import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { addProductBrand } from '../../../api/ProductBrandApi';

const AddProductBrand = () => {
    const [productBrand, setProductBrand] = useState({
        Brand_name: '',
        slug: '',
        status: true
    });
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setProductBrand(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        // Kiểm tra định dạng file
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!validTypes.includes(selectedFile.type)) {
            setSnackbarMessage('Chỉ chấp nhận ảnh JPG, PNG, GIF');
            setOpenSnackbar(true);
            return;
        }

        // Kiểm tra kích thước file
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (selectedFile.size > maxSize) {
            setSnackbarMessage('Ảnh không được vượt quá 5MB');
            setOpenSnackbar(true);
            return;
        }

        // Set file và preview
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result);
        reader.readAsDataURL(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productBrand.Brand_name.trim()) {
            setSnackbarMessage('Vui lòng nhập tên thương hiệu');
            setOpenSnackbar(true);
            return;
        }

        if (!file) {
            setSnackbarMessage('Vui lòng chọn ảnh');
            setOpenSnackbar(true);
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('Brand_name', productBrand.Brand_name.trim());
            formData.append('status', productBrand.status.toString());
            formData.append('image_url', file); // ✅ phải khớp tên 'image'

            const token = localStorage.getItem('token');
            await addProductBrand(formData, token); // ✅ Gọi API đúng endpoint

            setSnackbarMessage('Thêm thương hiệu thành công!');
            setOpenSnackbar(true);
            setTimeout(() => navigate('/admin/ProductBrand/ProductBrand-list'), 1500);
        } catch (error) {
            console.error('Lỗi:', error);
            setSnackbarMessage(error.response?.data?.message || 'Lỗi khi thêm thương hiệu. Vui lòng thử lại');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Thêm Thương Hiệu Mới
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Tên thương hiệu"
                    name="Brand_name"
                    value={productBrand.Brand_name}
                    onChange={handleChange}
                    required
                    error={productBrand.Brand_name.trim() === ''}
                    helperText={productBrand.Brand_name.trim() === '' ? 'Tên thương hiệu không được để trống' : ''}
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
                            checked={productBrand.status}
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
                        {loading ? <CircularProgress size={24} /> : 'Thêm Thương Hiệu'}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/admin/ProductBrand/ProductBrand-list')}
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

export default AddProductBrand;
