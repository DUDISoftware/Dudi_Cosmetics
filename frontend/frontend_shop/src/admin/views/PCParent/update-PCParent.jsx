import React, { useEffect, useState } from 'react';
import {
    Typography,
    Box,
    TextField,
    Button,
    Snackbar,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getPCParentById, updatePCParent } from '../../../api/pcParentApi';

const UpdatePCParent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pcParent, setPCParent] = useState({
        category_name: '',
        status: 'true',
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const fetchPCParent = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setSnackbarMessage('Token không tồn tại. Vui lòng đăng nhập lại.');
                setOpenSnackbar(true);
                return;
            }
            try {
                const data = await getPCParentById(id, token);
                if (data.status) {
                    setPCParent({
                        category_name: data.data.category_name || '',
                        status: data.data.status === true || data.data.status === 'true' ? 'true' : 'false',
                    });
                } else {
                    setSnackbarMessage('Không thể lấy chi tiết danh mục sản phẩm cha: ' + data.message);
                    setOpenSnackbar(true);
                }
            } catch (error) {
                setSnackbarMessage('Lỗi khi lấy chi tiết danh mục sản phẩm cha: ' + error.message);
                setOpenSnackbar(true);
            }
        };
        fetchPCParent();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPCParent((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const data = await updatePCParent(id, pcParent, token);
            if (data.status) {
                setSnackbarMessage('Cập nhật danh mục sản phẩm cha thành công!');
                setOpenSnackbar(true);
                setTimeout(() => navigate('/admin/PCParent/PCParent-list'), 1000);
            } else {
                setSnackbarMessage('Không thể cập nhật danh mục sản phẩm cha: ' + data.message);
                setOpenSnackbar(true);
            }
        } catch (error) {
            setSnackbarMessage('Lỗi khi cập nhật danh mục sản phẩm cha: ' + (error.response?.data?.message || error.message));
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Cập Nhật Danh Mục Sản Phẩm Cha
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Tên Danh Mục"
                    name="category_name"
                    value={pcParent.category_name}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="status-label">Trạng Thái</InputLabel>
                    <Select
                        labelId="status-label"
                        name="status"
                        value={pcParent.status}
                        label="Trạng Thái"
                        onChange={handleChange}
                    >
                        <MenuItem value="true">Hiển thị</MenuItem>
                        <MenuItem value="false">Ẩn</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" type="submit" sx={{ mr: 2 }}>
                    Cập Nhật
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate('/admin/PCParent/PCParent-list')}>
                    Quay Lại
                </Button>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Hiển thị ở giữa phía trên
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('không thể') || snackbarMessage.toLowerCase().includes('lỗi') ? 'error' : 'success'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UpdatePCParent;