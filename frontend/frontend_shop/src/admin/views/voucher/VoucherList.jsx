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
import { useNavigate } from 'react-router-dom';
import { getVouchers, deleteVoucher } from '../../../api/voucherApi';

const VoucherList = () => {
    const [vouchers, setVouchers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Hàm lấy danh sách voucher
        const fetchVouchers = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token không tồn tại. Vui lòng đăng nhập lại.');
                return;
            }

            try {
                const data = await getVouchers(token);
                setVouchers(data.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách voucher:', error.message);
            }
        };

        fetchVouchers();
    }, []);

    // Điều hướng tới các trang khác (Chi tiết, Sửa, Thêm)
    const handleNavigate = (path, id = '') => {
        navigate(`${path}${id}`);
    };

    // Xóa voucher
    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa voucher này?')) {
            const token = localStorage.getItem('token');
            try {
                const response = await deleteVoucher(id, token);
                if (response.status) {
                    setVouchers(prev => prev.filter(voucher => voucher._id !== id));
                } else {
                    console.error('Không thể xóa voucher:', response.message);
                }
            } catch (error) {
                console.error('Lỗi khi xóa voucher:', error.message);
            }
        }
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                onClick={() => handleNavigate('/admin/voucher/add')}
            >
                Thêm Voucher
            </Button>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Danh Sách Voucher
            </Typography>
            <Box sx={{ overflow: 'auto', width: '100%' }}>
                <Table aria-label="bảng voucher" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            {['STT', 'Mã', 'Ngày Bắt Đầu', 'Ngày Kết Thúc', 'Số Lượng', 'Giảm Giá (%)', 'Số Tiền Giảm Tối Đa (VNĐ)', 'Hành Động'].map((header, idx) => (
                                <TableCell key={idx}>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {header}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vouchers.length > 0 ? (
                            vouchers.map((voucher, idx) => (
                                <TableRow key={voucher._id}>
                                    {[
                                        idx + 1,
                                        voucher.code,
                                        new Date(voucher.start_date).toLocaleDateString(),
                                        new Date(voucher.end_date).toLocaleDateString(),
                                        voucher.quantity,
                                        `${voucher.discount_percentage}%`,
                                        voucher.max_discount_amount.toLocaleString('vi-VN') + ' VNĐ',
                                    ].map((item, index) => (
                                        <TableCell key={index}>
                                            <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                                {item}
                                            </Typography>
                                        </TableCell>
                                    ))}
                                    <TableCell align="center">
                                        <Button variant="outlined" color="primary" size="small" onClick={() => handleNavigate('/admin/voucher/detail/', voucher._id)} sx={{ mr: 1 }}>Xem</Button>
                                        <Button variant="outlined" color="secondary" size="small" onClick={() => handleNavigate('/admin/voucher/update/', voucher._id)} sx={{ mr: 1 }}>Sửa</Button>
                                        <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(voucher._id)}>Xóa</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    <Typography variant="subtitle1">Không có voucher nào.</Typography>
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
