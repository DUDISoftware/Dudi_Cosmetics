import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, Snackbar, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getPCChildById, deletePCChild } from '../../../api/pcChildApi';
import { getPCParentById } from '../../../api/pcParentApi';

const PCChildDetail = () => {
    const { id } = useParams();
    const [pcChild, setPCChild] = useState(null);
    const [parentName, setParentName] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPCChild = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setSnackbarMessage('Token không tồn tại. Vui lòng đăng nhập lại.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                return;
            }

            try {
                const data = await getPCChildById(id, token);
                if (data.status) {
                    setPCChild(data.data);
                    // Nếu có parent_id, lấy tên danh mục cha
                    if (data.data.parent_id) {
                        try {
                            const parentRes = await getPCParentById(data.data.parent_id, token);
                            if (parentRes.status) {
                                setParentName(parentRes.data.category_name);
                            } else {
                                setParentName('Không xác định');
                            }
                        } catch {
                            setParentName('Không xác định');
                        }
                    } else {
                        setParentName('Chưa có danh mục cha');
                    }
                } else {
                    setSnackbarMessage('Không thể lấy chi tiết danh mục con: ' + data.message);
                    setSnackbarSeverity('error');
                    setOpenSnackbar(true);
                }
            } catch (error) {
                setSnackbarMessage('Lỗi khi lấy chi tiết danh mục con: ' + error);
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        };

        fetchPCChild();
    }, [id]);

    const handleBack = () => {
        navigate('/admin/PCChild/PCChild-list');
    };

    const handleDelete = async () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa danh mục con này?')) {
            const token = localStorage.getItem('token');
            try {
                const response = await deletePCChild(id, token);
                if (response.status) {
                    setSnackbarMessage('Xóa danh mục con thành công!');
                    setSnackbarSeverity('success');
                    setOpenSnackbar(true);
                    setTimeout(() => navigate('/admin/PCChild/PCChild-list'), 1200);
                } else {
                    setSnackbarMessage('Xóa danh mục con thất bại: ' + response.message);
                    setSnackbarSeverity('error');
                    setOpenSnackbar(true);
                }
            } catch (error) {
                setSnackbarMessage('Lỗi khi xóa danh mục con: ' + error);
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    if (!pcChild) {
        return <Typography variant="h6">Đang tải...</Typography>;
    }

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h5" fontWeight={600} mb={2}>
                Chi Tiết Danh Mục Con
            </Typography>
            <Typography variant="subtitle1"><strong>Tên Danh Mục:</strong> {pcChild.category_name}</Typography>
            <Typography variant="subtitle1"><strong>Slug:</strong> {pcChild.slug}</Typography>
            <Typography variant="subtitle1"><strong>Danh Mục Cha:</strong> {parentName || 'Chưa có danh mục cha'}</Typography>
            <Typography variant="subtitle1">
                <strong>Trạng Thái:</strong> {(pcChild.status === true || pcChild.status === 'true') ? 'Hiển thị' : 'Ẩn'}
            </Typography>
            <Typography variant="subtitle1"><strong>Ngày Tạo:</strong> {new Date(pcChild.created_at).toLocaleDateString()}</Typography>

            <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate(`/admin/pcchild/update/${id}`)}
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
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default PCChildDetail;