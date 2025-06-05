import React, { useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { addPCChild } from '../../../api/pcChildApi';
import { getPCParents } from '../../../api/pcParentApi';

const AddPCChild = () => {
    const [pcChild, setPCChild] = useState({
        category_name: '',
        status: 'true', // 'true': Hiển thị, 'false': Ẩn
        parent_id: '',
    });
    const [parentCategories, setParentCategories] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPCParents = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token không tồn tại. Vui lòng đăng nhập lại.');
                return;
            }
            try {
                const data = await getPCParents(token);
                setParentCategories(data.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh mục cha:', error.message);
            }
        };
        fetchPCParents();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPCChild({ ...pcChild, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await addPCChild(pcChild, token);
            setSnackbarMessage('Thêm danh mục con thành công!');
            setOpenSnackbar(true);
            setTimeout(() => navigate('/admin/PCChild/PCChild-list'), 1200);
        } catch (error) {
            setSnackbarMessage(`Không thể thêm danh mục con: ${error.response?.data?.message || error.message}`);
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Thêm Danh Mục Con
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
                    Thêm Danh Mục Con
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
                <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('Không thể') ? 'error' : 'success'} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddPCChild;