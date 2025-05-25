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
    Button,
    Chip
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, deleteProduct } from '../../../api/productsApi';
import { getProductBrandById } from '../../../api/ProductBrandApi';
import { getPCChildById } from '../../../api/pcChildApi';
import { getPCParentById } from '../../../api/pcParentApi';

const ProductsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Thông tin tên thương hiệu, danh mục con, danh mục cha
    const [brandName, setBrandName] = useState('');
    const [categoryChildName, setCategoryChildName] = useState('');
    const [categoryParentName, setCategoryParentName] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await getProductById(id, token);
                setProduct(data.data);

                // Lấy tên thương hiệu
                if (data.data.brand_id) {
                    try {
                        const brandRes = await getProductBrandById(data.data.brand_id, token);
                        setBrandName(brandRes.data?.Brand_name || brandRes.data?.name || '');
                    } catch {
                        setBrandName('');
                    }
                }

                // Lấy tên danh mục con và cha
                if (data.data.category_id) {
                    try {
                        const childRes = await getPCChildById(data.data.category_id, token);
                        setCategoryChildName(childRes.data?.category_name || '');
                        if (childRes.data?.parent_id) {
                            try {
                                const parentRes = await getPCParentById(childRes.data.parent_id, token);
                                setCategoryParentName(parentRes.data?.category_name || '');
                            } catch {
                                setCategoryParentName('');
                            }
                        }
                    } catch {
                        setCategoryChildName('');
                        setCategoryParentName('');
                    }
                }
            } catch (error) {
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
            <Card sx={{ maxWidth: 700, margin: '0 auto', p: 2 }}>
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
                        <Chip
                            label={product.status === 'active' ? "Hoạt động" : "Không hoạt động"}
                            color={product.status === 'active' ? "success" : "error"}
                            size="small"
                        />
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Giá gốc: {product.base_price} VND
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Số lượng trong kho: {product.store_quantity}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Thương hiệu: {brandName || product.brand_id}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Danh mục cha: {categoryParentName}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Danh mục con: {categoryChildName}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Sản phẩm nổi bật: <Switch checked={!!product.is_hot} disabled />
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Sản phẩm nhiều lượt xem: <Switch checked={!!product.is_most_viewed} disabled />
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Ảnh phụ:
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            {(product.sub_images_urls || []).map((src, idx) => (
                                <Box
                                    key={idx}
                                    component="img"
                                    src={src}
                                    alt={`sub-${idx}`}
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        objectFit: 'cover',
                                        borderRadius: 1,
                                        border: '1px solid #eee'
                                    }}
                                />
                            ))}
                        </Box>
                    </Typography>
                    <Typography variant="caption" color="textSecondary" display="block" mt={2}>
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

export default ProductsDetail;