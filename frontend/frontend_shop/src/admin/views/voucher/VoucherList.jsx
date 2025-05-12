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

const VoucherList = () => {
    const [vouchers, setVouchers] = useState([]);
    const navigate = useNavigate(); // Khởi tạo useNavigate

    useEffect(() => {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage

        if (!token) {
            console.error('Token không tồn tại. Vui lòng đăng nhập lại.');
            return;
        }

        // Fetch vouchers from API
        fetch('http://localhost:5000/api/Vouchers/Vouchers-list', {
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
                    setVouchers(data.data);
                } else {
                    console.error('Không thể lấy danh sách voucher:', data.message);
                }
            })
            .catch((error) => console.error('Lỗi khi lấy danh sách voucher:', error));
    }, []);

    const handleView = (id) => {
        fetch(`http://localhost:5000/api/Vouchers/Vouchers-detail/${id}`, {
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
                console.log('Chi tiết voucher:', data);
                // Thêm logic hiển thị chi tiết voucher (ví dụ: mở modal hoặc chuyển hướng)
            })
            .catch((error) => console.error('Lỗi khi xem chi tiết voucher:', error));
    };

    const handleEdit = (id) => {
        navigate(`/admin/views/voucher/update-Vouchers/${id}`); // Chuyển hướng đến trang sửa voucher
    };

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa voucher này?')) {
            fetch(`http://localhost:5000/api/Vouchers/delete-Vouchers/${id}`, {
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
                        console.log('Xóa voucher thành công:', data.message);
                        setVouchers((prev) => prev.filter((voucher) => voucher._id !== id)); // Cập nhật danh sách
                    } else {
                        console.error('Không thể xóa voucher:', data.message);
                    }
                })
                .catch((error) => console.error('Lỗi khi xóa voucher:', error));
        }
    };

    const handleAddVoucher = () => {
        navigate('/admin/views/voucher/add-Vouchers'); // Chuyển hướng đến trang thêm voucher
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                onClick={handleAddVoucher}
            >
                Thêm Voucher
            </Button>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Danh Sách Voucher
            </Typography>
            <Box sx={{ overflow: 'auto', width: '100%' }}>
                <Table
                    aria-label="bảng voucher"
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
                                    Ngày Bắt Đầu
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Ngày Kết Thúc
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Số Lượng
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Giảm Giá (%)
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Số Tiền Giảm Tối Đa (VNĐ)
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
                        {vouchers.length > 0 ? (
                            vouchers.map((voucher) => (
                                <TableRow key={voucher._id}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {voucher.code}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {new Date(voucher.start_date).toLocaleDateString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {new Date(voucher.end_date).toLocaleDateString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {voucher.quantity}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {voucher.discount_percentage}%
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="h6">
                                            {voucher.max_discount_amount.toLocaleString('vi-VN')} VNĐ
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            onClick={() => handleView(voucher._id)}
                                            sx={{ mr: 1 }}
                                        >
                                            Xem
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            size="small"
                                            onClick={() => handleEdit(voucher._id)}
                                            sx={{ mr: 1 }}
                                        >
                                            Sửa
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            onClick={() => handleDelete(voucher._id)}
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
                                        Không có voucher nào.
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

export default VoucherList;