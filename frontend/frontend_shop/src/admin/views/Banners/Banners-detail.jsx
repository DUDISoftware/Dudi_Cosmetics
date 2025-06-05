import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    Snackbar,
    Alert,
    Card,
    CardContent,
    CardMedia,
    Switch,
    Button // <-- Thêm dòng này
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom'; // <-- Thêm useNavigate
import { getBannerById, deleteBanner } from '../../../api/bannerApi'; // <-- import trực tiếp deleteBanner

const BannersDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // <-- Khởi tạo navigate
    const [banner, setBanner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await getBannerById(id, token);
                setBanner(data.data);
            } catch (error) {
                console.error('Lỗi khi tải chi tiết banner:', error);
                setSnackbarMessage('Không thể tải chi tiết banner');
                setOpenSnackbar(true);
            } finally {
                setLoading(false);
            }
        };

        fetchBanner();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa banner này?')) {
            try {
                const token = localStorage.getItem('token');
                await deleteBanner(banner._id, token);
                setSnackbarMessage('Xóa banner thành công!');
                setOpenSnackbar(true);
                setTimeout(() => navigate('/admin/Banners/Banners_list'), 1200);
            } catch (error) {
                setSnackbarMessage('Lỗi khi xóa banner');
                setOpenSnackbar(true);
            }
        }
    };

    if (loading) {
        return (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!banner) {
        return (
            <Typography variant="h6" color="error" align="center" mt={4}>
                Không tìm thấy banner.
            </Typography>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Card sx={{ maxWidth: 600, margin: '0 auto', p: 2 }}>
                {banner.image && (
                    <CardMedia
                        component="img"
                        image={banner.image}
                        alt="Ảnh banner"
                        sx={{ maxHeight: 300, objectFit: 'cover' }}
                    />
                )}
                <CardContent>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                        {banner.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {banner.description || 'Không có mô tả.'}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Trạng thái hoạt động:{' '}
                        <Switch checked={banner.status} disabled />
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Tạo lúc: {new Date(banner.created_at).toLocaleString()}
                    </Typography>
                </CardContent>
            </Card>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                    variant="outlined"
                    onClick={() => navigate('/admin/Banners/Banners_list')}
                >
                    Quay lại
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/admin/banners/update/${banner._id}`)}
                >
                    Chuyển đến Cập nhật
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                >
                    Xóa
                </Button>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={snackbarMessage.includes('thành công') ? 'success' : 'error'}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default BannersDetail;
