import React, { useEffect, useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostsCategoryById, deletePostsCategory } from '../../../api/PostsCategoryApi';

const PostsCategoryDetail = () => {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token không tồn tại. Vui lòng đăng nhập lại.');
                return;
            }
            try {
                const data = await getPostsCategoryById(id, token);
                if (data.status) {
                    setCategory(data.data);
                } else {
                    console.error('Không thể lấy chi tiết danh mục:', data.message);
                }
            } catch (error) {
                console.error('Lỗi khi lấy chi tiết danh mục:', error);
            }
        };
        fetchCategory();
    }, [id]);

    const handleBack = () => {
        navigate('/admin/PostsCategory/PostsCategory-list');
    };

    const handleDelete = async () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
            const token = localStorage.getItem('token');
            try {
                const response = await deletePostsCategory(id, token);
                if (response.status) {
                    alert('Xóa danh mục thành công!');
                    navigate('/admin/PostsCategory/PostsCategory-list');
                } else {
                    alert('Xóa danh mục thất bại: ' + response.message);
                }
            } catch (error) {
                alert('Lỗi khi xóa danh mục: ' + error);
            }
        }
    };

    if (!category) {
        return <Typography variant="h6">Đang tải...</Typography>;
    }

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h5" fontWeight={600} mb={2}>
                Chi Tiết Danh Mục Bài Viết
            </Typography>
            <Typography variant="subtitle1"><strong>Tên Danh Mục:</strong> {category.title}</Typography>
            <Typography variant="subtitle1"><strong>Slug :</strong> {category.slug}</Typography>
            <Typography variant="subtitle1"><strong>Trạng Thái:</strong> {category.status ? 'Hiển thị' : 'Ẩn'}</Typography>
            <Typography variant="subtitle1"><strong>Ngày Tạo:</strong> {category.created_at ? new Date(category.created_at).toLocaleDateString() : ''}</Typography>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate(`/admin/postscategory/update/${id}`)}
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

export default PostsCategoryDetail;