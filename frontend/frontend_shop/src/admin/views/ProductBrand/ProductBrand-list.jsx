import React, { useEffect, useState } from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getProductBrands, deleteProductBrand } from '../../../api/ProductBrandApi';

const ProductBrandList = () => {
    const [productBrands, setProductBrands] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Hàm lấy danh sách Product Brands
        const fetchProductBrands = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token không tồn tại. Vui lòng đăng nhập lại.');
                return;
            }

            try {
                const data = await getProductBrands(token);
                setProductBrands(data.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách Product Brands:', error.message);
            }
        };

        fetchProductBrands();
    }, []);

    // Điều hướng tới các trang khác (Chi tiết, Sửa, Thêm)
    const handleNavigate = (path, id = '') => {
        navigate(`${path}${id}`);
    };

    // Xóa Product Brand
    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa thương hiệu này?')) {
            const token = localStorage.getItem('token');
            try {
                const response = await deleteProductBrand(id, token);
                if (response.status) {
                    setProductBrands(prev => prev.filter(productBrand => productBrand._id !== id));
                } else {
                    console.error('Không thể xóa thương hiệu:', response.message);
                }
            } catch (error) {
                console.error('Lỗi khi xóa thương hiệu:', error.message);
            }
        }
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                onClick={() => handleNavigate('/admin/ProductBrand/add')}
            >
                Thêm Thương Hiệu
            </Button>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Danh Sách Thương Hiệu
            </Typography>
            <Box sx={{ overflow: 'auto', width: '100%' }}>
                <Table aria-label="bảng thương hiệu" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            {['STT', 'Tên thương hiệu', 'Slug', 'Hình ảnh', 'Trạng thái', 'Ngày tạo', 'Hành Động'].map((header, idx) => (
                                <TableCell key={idx}>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {header}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productBrands.length > 0 ? (
                            productBrands.map((productBrand, idx) => (
                                <TableRow key={productBrand._id}>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {idx + 1}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {productBrand.Brand_name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {productBrand.slug}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {productBrand.image_url && (
                                            <img
                                                src={productBrand.image_url}
                                                alt={productBrand.title || productBrand.Brand_name}
                                                style={{ height: 50, maxWidth: 80, objectFit: 'contain', borderRadius: 4 }}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={productBrand.status ? "Hoạt động" : "Không hoạt động"}
                                            color={productBrand.status ? "success" : "error"}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {new Date(productBrand.created_at).toLocaleDateString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="outlined" color="primary" size="small" onClick={() => handleNavigate('/admin/ProductBrand/detail/', productBrand._id)} sx={{ mr: 1 }}>Xem</Button>
                                        <Button variant="outlined" color="secondary" size="small" onClick={() => handleNavigate('/admin/ProductBrand/update/', productBrand._id)} sx={{ mr: 1 }}>Sửa</Button>
                                        <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(productBrand._id)}>Xóa</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Typography variant="subtitle1">Không có thương hiệu nào.</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
};

export default ProductBrandList;
