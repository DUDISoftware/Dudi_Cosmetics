import React, { useEffect, useState } from 'react';
import {
    Typography,
    Box,
    TextField,
    Button,
    Snackbar,
    Alert,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getVoucherById, updateVoucher } from '../../../api/voucherApi';

const UpdateVouchers = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [voucher, setVoucher] = useState({
        code: '',
        start_date: '',
        end_date: '',
        quantity: '',
        discount_percentage: '',
        max_discount_amount: '',
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Lấy chi tiết voucher khi component mount
    useEffect(() => {
        const fetchVoucher = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setSnackbarMessage('Token không tồn tại. Vui lòng đăng nhập lại.');
                setOpenSnackbar(true);
                return;
            }

            try {
                const data = await getVoucherById(id, token);
                if (data.status) {
                    setVoucher(data.data);
                } else {
                    setSnackbarMessage('Không thể lấy chi tiết voucher: ' + data.message);
                    setOpenSnackbar(true);
                }
            } catch (error) {
                setSnackbarMessage('Lỗi khi lấy chi tiết voucher: ' + error.message);
                setOpenSnackbar(true);
            }
        };

        fetchVoucher();
    }, [id]);

    // Xử lý thay đổi của các trường trong form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setVoucher((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        // Loại bỏ _id khỏi dữ liệu trước khi gửi
        const { _id, ...voucherData } = voucher;

        try {
            const data = await updateVoucher(id, voucherData, token);
            if (data.status) {
                setSnackbarMessage('Cập nhật voucher thành công!');
                setOpenSnackbar(true);
                setTimeout(() => navigate('/admin/voucherlist'), 1000);
            } else {
                setSnackbarMessage('Không thể cập nhật voucher: ' + data.message);
                setOpenSnackbar(true);
            }
        } catch (error) {
            setSnackbarMessage('Lỗi khi cập nhật voucher: ' + error.message);
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Cập Nhật Voucher
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Mã Voucher"
                    name="code"
                    value={voucher.code}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Ngày Bắt Đầu"
                    type="date"
                    name="start_date"
                    value={voucher.start_date ? voucher.start_date.split('T')[0] : ''}
                    onChange={handleChange}
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Ngày Kết Thúc"
                    type="date"
                    name="end_date"
                    value={voucher.end_date ? voucher.end_date.split('T')[0] : ''}
                    onChange={handleChange}
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Số Lượng"
                    type="number"
                    name="quantity"
                    value={voucher.quantity}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Giảm Giá (%)"
                    type="number"
                    name="discount_percentage"
                    value={voucher.discount_percentage}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Số Tiền Giảm Tối Đa (VNĐ)"
                    type="number"
                    name="max_discount_amount"
                    value={voucher.max_discount_amount}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" type="submit" sx={{ mr: 2 }}>
                    Cập Nhật
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate('/admin/voucherlist')}>
                    Quay Lại
                </Button>
            </form>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('thất bại') || snackbarMessage.includes('lỗi') ? 'error' : 'success'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UpdateVouchers;
