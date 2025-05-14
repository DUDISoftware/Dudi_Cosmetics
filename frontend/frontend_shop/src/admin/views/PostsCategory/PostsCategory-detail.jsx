import React, { useEffect, useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const PostsCategoryDetail = () => {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:5000/api/PostsCategory/PostsCategory-detail/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) setCategory(data.data);
            });
    }, [id]);

    if (!category) return <Typography variant="h6">Đang tải...</Typography>;

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h5" fontWeight={600} mb={2}>
                Chi Tiết Danh Mục Bài Viết
            </Typography>
            <Typography variant="subtitle1"><strong>Tiêu Đề:</strong> {category.title}</Typography>
            <Typography variant="subtitle1"><strong>Slug:</strong> {category.slug}</Typography>
            <Typography variant="subtitle1"><strong>Trạng Thái:</strong> {category.status}</Typography>
            <Typography variant="subtitle1"><strong>Ngày Tạo:</strong> {category.created_at ? new Date(category.created_at).toLocaleString('vi-VN') : ''}</Typography>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate(`/admin/PostsCategory/update/${id}`)}
                sx={{ mt: 2, mr: 2 }}
            >
                Sửa
            </Button>
            <Button variant="contained" color="primary" onClick={() => navigate('/admin/PostsCategory-list')} sx={{ mt: 2 }}>
                Quay Lại
            </Button>
        </Box>
    );
};

export default PostsCategoryDetail;