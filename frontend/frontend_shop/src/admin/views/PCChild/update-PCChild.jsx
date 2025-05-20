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
import { getPCChildById, updatePCChild } from '../../../api/pcChildApi';
import { getPCParents } from '../../../api/pcParentApi';

const UpdatePCChild = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pcChild, setPCChild] = useState({
        category_name: '',
        status: 'true',
        parent_id: '',
    });
    const [parentCategories, setParentCategories] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const fetchPCChild = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setSnackbarMessage('Token không tồn tại. Vui lòng đăng nhập lại.');
                setOpenSnackbar(true);
                return;
            }
            try {
                const data = await getPCChildById(id, token);
                if (data.status) {
                    setPCChild({
                        category_name: data.data.category_name || '',
                        slug: data.data.slug || '',
                        status: data.data.status === true || data.data.status === 'true' ? 'true' : 'false',
                        parent_id: data.data.parent_id || '',
                    });
                } else {
                    setSnackbarMessage('Không thể lấy chi tiết danh mục con: ' + data.message);
                    setOpenSnackbar(true);
                }
            } catch (error) {
                setSnackbarMessage('Lỗi khi lấy chi tiết danh mục con: ' + error.message);
                setOpenSnackbar(true);
            }
        };

        const fetchParentCategories = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setSnackbarMessage('Token không tồn tại. Vui lòng đăng nhập lại.');
                setOpenSnackbar(true);
                return;
            }
            try {
                const data = await getPCParents(token);
                setParentCategories(data.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh mục cha:', error);
            }
        };

        fetchPCChild();
        fetchParentCategories();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPCChild((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const { _id, ...pcChildData } = pcChild;
        try {
            const data = await updatePCChild(id, pcChildData, token);
            if (data.status) {
                setSnackbarMessage('Cập nhật danh mục con thành công!');
                setOpenSnackbar(true);
                setTimeout(() => navigate('/admin/PCChild/PCChild-list'), 1000);
            } else {
                setSnackbarMessage('Không thể cập nhật danh mục con: ' + data.message);
                setOpenSnackbar(true);
            }
        } catch (error) {
            setSnackbarMessage('Lỗi khi cập nhật danh mục con: ' + (error.response?.data?.message || error.message));
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Cập Nhật Danh Mục Con
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Tên Danh Mục"
                    name="category_name"
                    value={pcChild.category_name}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="status-label">Trạng Thái</InputLabel>
                    <Select
                        labelId="status-label"
                        name="status"
                        value={pcChild.status}
                        label="Trạng Thái"
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="true">Hiển thị</MenuItem>
                        <MenuItem value="false">Ẩn</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="parent-label">Danh Mục Cha</InputLabel>
                    <Select
                        labelId="parent-label"
                        name="parent_id"
                        value={pcChild.parent_id}
                        label="Danh Mục Cha"
                        onChange={handleChange}
                        required
                    >
                        {parentCategories.map((parent) => (
                            <MenuItem key={parent._id} value={parent._id}>
                                {parent.category_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" type="submit" sx={{ mr: 2 }}>
                    Cập Nhật
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate('/admin/PCChild/PCChild-list')}>
                    Quay Lại
                </Button>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('không thể') || snackbarMessage.toLowerCase().includes('lỗi') ? 'error' : 'success'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UpdatePCChild;