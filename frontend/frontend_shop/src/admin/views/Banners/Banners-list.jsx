import React, { useEffect, useState } from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const BannersList = () => {
    const [banners, setBanners] = useState([]);
    const navigate = useNavigate(); // Khởi tạo useNavigate

    useEffect(() => {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage

        if (!token) {
            console.error('Token không tồn tại. Vui lòng đăng nhập lại.');
            return;
        }

        // Fetch banners from API
        fetch('http://localhost:5000/api/Banners/Banners-list', {
            headers: {
                Authorization: `Bearer ${token}`, // Thêm token vào header
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Lỗi HTTP! trạng thái: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.status) {
                    setBanners(data.data);
                } else {
                    console.error('Không thể lấy danh sách banners:', data.message);
                }
            })
            .catch((error) => console.error('Lỗi khi lấy danh sách banners:', error));
    }, []);

    const handleView = (id) => {
        fetch(`http://localhost:5000/api/Banners/Banners-detail/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Lỗi HTTP! trạng thái: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Chi tiết banner:', data);
                // Thêm logic hiển thị chi tiết banner (ví dụ: mở modal hoặc chuyển hướng)
            })
            .catch((error) => console.error('Lỗi khi xem chi tiết banner:', error));
    };

    const handleEdit = (id) => {
        navigate(`/admin/views/Banners/update-Banners/${id}`); // Chuyển hướng đến trang sửa banner
    };

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa banner này?')) {
            fetch(`http://localhost:5000/api/Banners/delete-Banners/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Lỗi HTTP! trạng thái: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.status) {
                        console.log('Xóa banner thành công:', data.message);
                        setBanners((prev) => prev.filter((banner) => banner._id !== id)); // Cập nhật danh sách
                    } else {
                        console.error('Không thể xóa banner:', data.message);
                    }
                })
                .catch((error) => console.error('Lỗi khi xóa banner:', error));
        }
    };

    const handleAddBanner = () => {
        navigate('/admin/views/Banners/add-Banners'); // Chuyển hướng đến trang thêm banner
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                onClick={handleAddBanner}
            >
                Thêm Banner
            </Button>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Danh Sách Banners
            </Typography>
            <Box sx={{ overflow: 'auto', width: '100%' }}>
                <Table
                    aria-label="bảng banners"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2,
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Mã
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Tiêu Đề
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Mô Tả
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Hình Ảnh
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Trạng Thái
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Ngày Tạo
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Hành Động
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {banners.length > 0 ? (
                            banners.map((banner) => (
                                <TableRow key={banner._id}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {banner._id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {banner.title}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {banner.description}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <img
                                            src={banner.image}
                                            alt={banner.title}
                                            style={{ width: "100px", height: "auto" }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {banner.status ? "Hoạt động" : "Không hoạt động"}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {new Date(banner.created_at).toLocaleDateString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            onClick={() => handleView(banner._id)}
                                            sx={{ mr: 1 }}
                                        >
                                            Xem
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            size="small"
                                            onClick={() => handleEdit(banner._id)}
                                            sx={{ mr: 1 }}
                                        >
                                            Sửa
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            onClick={() => handleDelete(banner._id)}
                                        >
                                            Xóa
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <Typography variant="subtitle1">
                                        Không có banner nào.
                                    </Typography>
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