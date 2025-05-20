import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    Snackbar,
    Alert,
    Card,
    CardContent,
    CardMedia,
    Switch,
    Button
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductBrandById, deleteProductBrand } from '../../../api/ProductBrandApi';

const ProductBrandDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productBrand, setProductBrand] = useState(null);
    const [loading, setLoading] = useState(true);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        const fetchProductBrand = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await getProductBrandById(id, token);
                setProductBrand(data.data);
            } catch (error) {
                console.error('Lỗi khi tải chi tiết thương hiệu:', error);
                setSnackbarMessage('Không thể tải chi tiết thương hiệu');
                setOpenSnackbar(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProductBrand();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa thương hiệu này?')) {
            try {
                const token = localStorage.getItem('token');
                await deleteProductBrand(productBrand._id, token);
                setSnackbarMessage('Xóa thương hiệu thành công!');
                setOpenSnackbar(true);
                setTimeout(() => navigate('/admin/ProductBrand/ProductBrand-list'), 1200);
            } catch (error) {
                setSnackbarMessage('Lỗi khi xóa thương hiệu');
                setOpenSnackbar(true);
            }
        }
    };

    if (loading) {
        return (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }
    
    if (!productBrand) {
        return (
            <Typography variant="h6" color="error" align="center" mt={4}>
                Không tìm thấy thương hiệu.
            </Typography>
        );
    }
    return (
        <Box sx={{ p: 3 }}>
            <Card sx={{ maxWidth: 600, margin: '0 auto', p: 2 }}>
                {productBrand.image_url && (
                    <CardMedia
                        component="img"
                        image={productBrand.image_url}
                        alt="Ảnh thương hiệu"
                        sx={{ maxHeight: 300, objectFit: 'cover' }}
                    />
                )}
                <CardContent>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                        {productBrand.Brand_name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {productBrand.slug || 'Không có slug.'}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Trạng thái hoạt động:{' '}
                        <Switch checked={productBrand.status === 'active'} disabled />
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Tạo lúc: {new Date(productBrand.created_at).toLocaleString()}
                    </Typography>
                </CardContent>
            </Card>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                    variant="outlined"
                    onClick={() => navigate('/admin/ProductBrand/ProductBrand-list')}
                >
                    Quay lại
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/admin/ProductBrand/update/${productBrand._id}`)}
                >
                    Chuyển đến Cập nhật
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                >
                    Xóa
                </Button>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
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

export default ProductBrandDetail;
