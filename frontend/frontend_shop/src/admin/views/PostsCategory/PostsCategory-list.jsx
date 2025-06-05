import React, { useEffect, useState } from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
    getPostsCategories,
    deletePostsCategory
} from '../../../api/PostsCategoryApi';

const PostsCategoryList = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token không tồn tại. Vui lòng đăng nhập lại.');
                return;
            }
            try {
                const data = await getPostsCategories(token);
                setCategories(data.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách danh mục bài viết:', error.message);
            }
        };
        fetchCategories();
    }, []);

    const handleNavigate = (path, id = '') => {
        navigate(`${path}${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
            const token = localStorage.getItem('token');
            try {
                const response = await deletePostsCategory(id, token);
                if (response.status) {
                    setCategories(prev => prev.filter(cat => cat._id !== id));
                } else {
                    console.error('Không thể xóa danh mục:', response.message);
                }
            } catch (error) {
                console.error('Lỗi khi xóa danh mục:', error.message);
            }
        }
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                onClick={() => handleNavigate('/admin/postscategory/add')}
            >
                Thêm Danh Mục Bài Viết
            </Button>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Danh Sách Danh Mục Bài Viết
            </Typography>
            <Box sx={{ overflow: 'auto', width: '100%' }}>
                <Table aria-label="bảng danh mục bài viết" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            {['STT', 'Tên Danh Mục', 'Slug', 'Trạng Thái', 'Ngày Tạo', 'Hành Động'].map((header, idx) => (
                                <TableCell key={idx}>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {header}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories && categories.length > 0 ? (
                            categories.map((cat, idx) => (
                                <TableRow key={cat._id}>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{idx + 1}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{cat.title}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{cat.slug}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {(cat.status === true || cat.status === 'true') ? 'Hiển thị' : 'Ẩn'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {cat.created_at ? new Date(cat.created_at).toLocaleDateString() : ''}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button variant="outlined" color="primary" size="small" onClick={() => handleNavigate('/admin/postscategory/detail/', cat._id)} sx={{ mr: 1 }}>Xem</Button>
                                        <Button variant="outlined" color="secondary" size="small" onClick={() => handleNavigate('/admin/postscategory/update/', cat._id)} sx={{ mr: 1 }}>Sửa</Button>
                                        <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(cat._id)}>Xóa</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Typography variant="subtitle1">Không có danh mục nào.</Typography>
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