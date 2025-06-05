import React, { useEffect, useState } from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Chip,
    Snackbar,
    Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../../api/productsApi';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch product list
        const fetchProducts = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setSnackbarMessage('Token không tồn tại. Vui lòng đăng nhập lại.');
                setOpenSnackbar(true);
                return;
            }

            try {
                const data = await getProducts(token);
                setProducts(data.data);
            } catch (error) {
                setSnackbarMessage('Lỗi khi lấy danh sách sản phẩm!');
                setOpenSnackbar(true);
                console.error('Lỗi khi lấy danh sách sản phẩm:', error.message);
            }
        };

        fetchProducts();
    }, []);

    // Handle navigation for view, edit, and add product
    const handleNavigate = (path, id = '') => {
        navigate(`${path}${id}`);
    };

    // Handle product deletion
    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            const token = localStorage.getItem('token');
            try {
                const response = await deleteProduct(id, token);
                if (response.status) {
                    setProducts(prev => prev.filter(product => product._id !== id));
                    setSnackbarMessage('Xóa sản phẩm thành công!');
                    setOpenSnackbar(true);
                } else {
                    setSnackbarMessage('Không thể xóa sản phẩm!');
                    setOpenSnackbar(true);
                    console.error('Không thể xóa sản phẩm:', response.message);
                }
            } catch (error) {
                setSnackbarMessage('Lỗi khi xóa sản phẩm!');
                setOpenSnackbar(true);
                console.error('Lỗi khi xóa sản phẩm:', error.message);
            }
        }
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                onClick={() => handleNavigate('/admin/products/add')}
            >
                Thêm Sản Phẩm
            </Button>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Danh Sách Sản Phẩm
            </Typography>
            <Box sx={{ overflow: 'auto', width: '100%' }}>
                <Table aria-label="bảng sản phẩm" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            {['STT', 'Tên sản phẩm', 'Mô tả', 'Hình ảnh', 'Trạng thái', 'Giá', 'Ngày tạo', 'Hành động'].map((header, idx) => (
                                <TableCell key={idx}>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {header}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.length > 0 ? (
                            products.map((product, idx) => (
                                <TableRow key={product._id}>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {idx + 1}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {product.product_name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {product.short_description ? product.short_description.substring(0, 50) + (product.short_description.length > 50 ? '...' : '') : ''}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {product.image_url && (
                                            <Box
                                                component="img"
                                                sx={{ height: 50, maxWidth: 80, objectFit: 'contain' }}
                                                src={product.image_url}
                                                alt={product.product_name}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={product.status === 'active' ? "Hoạt động" : "Không hoạt động"}
                                            color={product.status === 'active' ? "success" : "error"}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {product.base_price} VND
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {new Date(product.created_at).toLocaleDateString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="outlined" color="primary" size="small" onClick={() => handleNavigate('/admin/products/detail/', product._id)} sx={{ mr: 1 }}>Xem</Button>
                                        <Button variant="outlined" color="secondary" size="small" onClick={() => handleNavigate('/admin/products/update/', product._id)} sx={{ mr: 1 }}>Sửa</Button>
                                        <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(product._id)}>Xóa</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    <Typography variant="subtitle1">Không có sản phẩm nào.</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={snackbarMessage.includes('thành công') ? 'success' : 'error'}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ProductsList;