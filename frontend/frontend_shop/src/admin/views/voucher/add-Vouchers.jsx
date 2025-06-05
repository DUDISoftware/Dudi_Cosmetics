import React, { useState } from 'react';
import {
    Typography,
    Box,
    TextField,
    Button,
    Snackbar,
    Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addVoucher } from '../../../api/voucherApi';

const AddVouchers = () => {
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
    const navigate = useNavigate();

    // Xử lý thay đổi của các trường trong form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setVoucher({ ...voucher, [name]: value });
    };

    // Xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const data = await addVoucher(voucher, token);
            setSnackbarMessage('Thêm voucher thành công!');
            setOpenSnackbar(true);
            navigate('/admin/voucherlist'); // Điều hướng về danh sách voucher sau khi thêm thành công
        } catch (error) {
            setSnackbarMessage(`Không thể thêm voucher: ${error.message}`);
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Thêm Voucher
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
                    value={voucher.start_date}
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
                    value={voucher.end_date}
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
                    Thêm Voucher
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate('/admin/voucherlist')}>
                    Quay Lại
                </Button>
            </form>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('Không thể') ? 'error' : 'success'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddVouchers;
