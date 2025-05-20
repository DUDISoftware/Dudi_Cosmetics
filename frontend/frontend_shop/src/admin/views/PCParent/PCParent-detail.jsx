import React, { useEffect, useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getPCParentById, deletePCParent } from '../../../api/pcParentApi';

const PCParentDetail = () => {
    const { id } = useParams();
    const [pcParent, setPCParent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPCParent = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token không tồn tại. Vui lòng đăng nhập lại.');
                return;
            }

            try {
                const data = await getPCParentById(id, token);
                if (data.status) {
                    setPCParent(data.data);
                } else {
                    console.error('Không thể lấy chi tiết danh mục sản phẩm cha:', data.message);
                }
            } catch (error) {
                console.error('Lỗi khi lấy chi tiết danh mục sản phẩm cha:', error);
            }
        };

        fetchPCParent();
    }, [id]);

    const handleBack = () => {
        navigate('/admin/PCParent/PCParent-list');
    };

    const handleDelete = async () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa danh mục sản phẩm cha này?')) {
            const token = localStorage.getItem('token');
            try {
                const response = await deletePCParent(id, token);
                if (response.status) {
                    alert('Xóa danh mục sản phẩm cha thành công!');
                    navigate('/admin/PCParent/PCParent-list');
                } else {
                    alert('Xóa danh mục sản phẩm cha thất bại: ' + response.message);
                }
            } catch (error) {
                alert('Lỗi khi xóa danh mục sản phẩm cha: ' + error);
            }
        }
    };

    if (!pcParent) {
        return <Typography variant="h6">Đang tải...</Typography>;
    }

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h5" fontWeight={600} mb={2}>
                Chi Tiết Danh Mục Sản Phẩm Cha
            </Typography>
            <Typography variant="subtitle1"><strong>Tên Danh Mục:</strong> {pcParent.category_name}</Typography>
            <Typography variant="subtitle1"><strong>Slug:</strong> {pcParent.slug}</Typography>
            <Typography variant="subtitle1">
                <strong>Trạng Thái:</strong> {(pcParent.status === true || pcParent.status === 'true') ? 'Hiển thị' : 'Ẩn'}
            </Typography>
            <Typography variant="subtitle1"><strong>Ngày Tạo:</strong> {new Date(pcParent.created_at).toLocaleDateString()}</Typography>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate(`/admin/pcparent/update/${id}`)}
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

export default PCParentDetail;