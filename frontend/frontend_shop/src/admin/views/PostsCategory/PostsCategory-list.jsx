import React, { useEffect, useState } from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PostsCategoryList = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:5000/api/PostsCategory/PostsCategory-list', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) setCategories(data.data);
            });
    }, []);

    const handleView = (id) => navigate(`/admin/PostsCategory/detail/${id}`);
    const handleEdit = (id) => navigate(`/admin/PostsCategory/update/${id}`);
    const handleAdd = () => navigate('/admin/PostsCategory/add');
    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
            const token = localStorage.getItem('token');
            fetch(`http://localhost:5000/api/PostsCategory/delete-PostsCategory/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status) setCategories((prev) => prev.filter((c) => c._id !== id));
                });
        }
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleAdd}>
                Thêm Danh Mục
            </Button>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Danh Sách Danh Mục Bài Viết
            </Typography>
            <Box sx={{ overflow: 'auto', width: '100%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Tên Danh Mục</TableCell>
                            <TableCell>Slug</TableCell>
                            <TableCell>Trạng Thái</TableCell>
                            <TableCell>Ngày Tạo</TableCell>
                            <TableCell align="center">Hành Động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.length > 0 ? (
                            categories.map((cat, idx) => (
                                <TableRow key={cat._id}>
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell>{cat.title}</TableCell>
                                    <TableCell>{cat.slug}</TableCell>
                                    <TableCell>{cat.status}</TableCell>
                                    <TableCell>
                                        {cat.created_at ? new Date(cat.created_at).toLocaleString('vi-VN') : ''}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button variant="outlined" color="primary" size="small" onClick={() => handleView(cat._id)} sx={{ mr: 1 }}>
                                            Xem
                                        </Button>
                                        <Button variant="outlined" color="secondary" size="small" onClick={() => handleEdit(cat._id)} sx={{ mr: 1 }}>
                                            Sửa
                                        </Button>
                                        <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(cat._id)}>
                                            Xóa
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    Không có danh mục nào.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
};

export default PostsCategoryList;