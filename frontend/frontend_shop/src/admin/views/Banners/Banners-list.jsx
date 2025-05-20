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
import { getBanners, deleteBanner } from '../../../api/bannerApi';

const BannersList = () => {
    const [banners, setBanners] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Hàm lấy danh sách banner
        const fetchBanners = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token không tồn tại. Vui lòng đăng nhập lại.');
                return;
            }

            try {
                const data = await getBanners(token);
                setBanners(data.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách banner:', error.message);
            }
        };

        fetchBanners();
    }, []);

    // Điều hướng tới các trang khác (Chi tiết, Sửa, Thêm)
    const handleNavigate = (path, id = '') => {
        navigate(`${path}${id}`);
    };

    // Xóa banner
    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa banner này?')) {
            const token = localStorage.getItem('token');
            try {
                const response = await deleteBanner(id, token);
                if (response.status) {
                    setBanners(prev => prev.filter(banner => banner._id !== id));
                } else {
                    console.error('Không thể xóa banner:', response.message);
                }
            } catch (error) {
                console.error('Lỗi khi xóa banner:', error.message);
            }
        }
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                onClick={() => handleNavigate('/admin/banners/add')}
            >
                Thêm Banner
            </Button>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Danh Sách Banner
            </Typography>
            <Box sx={{ overflow: 'auto', width: '100%' }}>
                <Table aria-label="bảng banner" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            {['STT', 'Tiêu đề', 'Mô tả', 'Hình ảnh', 'Trạng thái', 'Ngày tạo', 'Hành Động'].map((header, idx) => (
                                <TableCell key={idx}>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {header}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {banners.length > 0 ? (
                            banners.map((banner, idx) => (
                                <TableRow key={banner._id}>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {idx + 1}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {banner.title}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {banner.description ? banner.description.substring(0, 50) + (banner.description.length > 50 ? '...' : '') : ''}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {banner.image && (
                                            <Box
                                                component="img"
                                                sx={{ height: 50, maxWidth: 80, objectFit: 'contain' }}
                                                src={banner.image}
                                                alt={banner.title}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={banner.status ? "Hoạt động" : "Không hoạt động"}
                                            color={banner.status ? "success" : "error"}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {new Date(banner.created_at).toLocaleDateString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="outlined" color="primary" size="small" onClick={() => handleNavigate('/admin/banners/detail/', banner._id)} sx={{ mr: 1 }}>Xem</Button>
                                        <Button variant="outlined" color="secondary" size="small" onClick={() => handleNavigate('/admin/banners/update/', banner._id)} sx={{ mr: 1 }}>Sửa</Button>
                                        <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(banner._id)}>Xóa</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <Typography variant="subtitle1">Không có banner nào.</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
};

export default BannersList;