import React, { useState, useEffect } from 'react';
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
import { getProductById, deleteProduct } from '../../../api/productsApi'; // import API để lấy sản phẩm

const ProductsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await getProductById(id, token);
                setProduct(data.data);
            } catch (error) {
                console.error('Lỗi khi tải chi tiết sản phẩm:', error);
                setSnackbarMessage('Không thể tải chi tiết sản phẩm');
                setOpenSnackbar(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                const token = localStorage.getItem('token');
                await deleteProduct(product._id, token);
                setSnackbarMessage('Xóa sản phẩm thành công!');
                setOpenSnackbar(true);
                setTimeout(() => navigate('/admin/products/products-list'), 1200);
            } catch (error) {
                setSnackbarMessage('Lỗi khi xóa sản phẩm');
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

    if (!product) {
        return (
            <Typography variant="h6" color="error" align="center" mt={4}>
                Không tìm thấy sản phẩm.
            </Typography>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Card sx={{ maxWidth: 600, margin: '0 auto', p: 2 }}>
                {product.image_url && (
                    <CardMedia
                        component="img"
                        image={product.image_url}
                        alt="Ảnh sản phẩm"
                        sx={{ maxHeight: 300, objectFit: 'cover' }}
                    />
                )}
                <CardContent>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                        {product.product_name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {product.short_description || 'Không có mô tả.'}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Mô tả chi tiết: {product.long_description || 'Không có mô tả chi tiết.'}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Trạng thái hoạt động:{' '}
                        <Switch checked={product.status === 'active'} disabled />
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Giá gốc: {product.base_price} VND
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Số lượng trong kho: {product.store_quantity}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Thương hiệu: {product.brand_id} {/* Hiển thị tên thương hiệu nếu cần */}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Danh mục: {product.category_id} {/* Hiển thị tên danh mục nếu cần */}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Tạo lúc: {new Date(product.created_at).toLocaleString()}
                    </Typography>
                </CardContent>
            </Card>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                    variant="outlined"
                    onClick={() => navigate('/admin/products/products-list')}
                >
                    Quay lại
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/admin/products/update/${product._id}`)}
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

export default ProductsDetail;
