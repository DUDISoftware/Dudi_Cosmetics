import React, { useEffect, useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getVoucherById, deleteVoucher } from '../../../api/voucherApi';

const VouchersDetail = () => {
    const { id } = useParams();
    const [voucher, setVoucher] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVoucher = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token không tồn tại. Vui lòng đăng nhập lại.');
                return;
            }

            try {
                const data = await getVoucherById(id, token);
                if (data.status) {
                    setVoucher(data.data);
                } else {
                    console.error('Không thể lấy chi tiết voucher:', data.message);
                }
            } catch (error) {
                console.error('Lỗi khi lấy chi tiết voucher:', error);
            }
        };

        fetchVoucher();
    }, [id]);

    const handleBack = () => {
        navigate('/admin/voucherlist');
    };

    const handleDelete = async () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa voucher này?')) {
            const token = localStorage.getItem('token');
            try {
                const response = await deleteVoucher(id, token);
                if (response.status) {
                    alert('Xóa voucher thành công!');
                    navigate('/admin/voucherlist');
                } else {
                    alert('Xóa voucher thất bại: ' + response.message);
                }
            } catch (error) {
                alert('Lỗi khi xóa voucher: ' + error);
            }
        }
    };

    if (!voucher) {
        return <Typography variant="h6">Đang tải...</Typography>;
    }

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h5" fontWeight={600} mb={2}>
                Chi Tiết Voucher
            </Typography>
            <Typography variant="subtitle1"><strong>Mã:</strong> {voucher.code}</Typography>
            <Typography variant="subtitle1"><strong>Ngày Bắt Đầu:</strong> {new Date(voucher.start_date).toLocaleDateString()}</Typography>
            <Typography variant="subtitle1"><strong>Ngày Kết Thúc:</strong> {new Date(voucher.end_date).toLocaleDateString()}</Typography>
            <Typography variant="subtitle1"><strong>Số Lượng:</strong> {voucher.quantity}</Typography>
            <Typography variant="subtitle1"><strong>Giảm Giá (%):</strong> {voucher.discount_percentage}%</Typography>
            <Typography variant="subtitle1"><strong>Số Tiền Giảm Tối Đa (VNĐ):</strong> {voucher.max_discount_amount.toLocaleString('vi-VN')} VNĐ</Typography>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate(`/admin/voucher/update/${id}`)}
                sx={{ mt: 2, mr: 2 }}
            >
                Sửa
            </Button>
            <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
                sx={{ mt: 2, mr: 2 }}
            >
                Xóa
            </Button>
            <Button variant="contained" color="primary" onClick={handleBack} sx={{ mt: 2 }}>
                Quay Lại
            </Button>
        </Box>
    );
};

export default VouchersDetail;
