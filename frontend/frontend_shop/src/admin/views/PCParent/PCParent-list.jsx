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
import { getPCParents, deletePCParent } from '../../../api/pcParentApi';

const PCParentList = () => {
    const [pcParents, setPCParents] = useState([]);
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
                setPCParents(data.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách PCParent:', error.message);
            }
        };
        fetchPCParents();
    }, []);

    const handleNavigate = (path, id = '') => {
        navigate(`${path}${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa danh mục sản phẩm cha này?')) {
            const token = localStorage.getItem('token');
            try {
                const response = await deletePCParent(id, token);
                if (response.status) {
                    setPCParents(prev => prev.filter(pcParent => pcParent._id !== id));
                } else {
                    console.error('Không thể xóa danh mục sản phẩm cha:', response.message);
                }
            } catch (error) {
                console.error('Lỗi khi xóa danh mục sản phẩm cha:', error.message);
            }
        }
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                onClick={() => handleNavigate('/admin/pcparent/add')}
            >
                Thêm Danh Mục Sản Phẩm Cha
            </Button>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Danh Sách Danh Mục Sản Phẩm Cha
            </Typography>
            <Box sx={{ overflow: 'auto', width: '100%' }}>
                <Table aria-label="bảng PCParent" sx={{ whiteSpace: "nowrap", mt: 2 }}>
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
                        {pcParents.length > 0 ? (
                            pcParents.map((pcParent, idx) => (
                                <TableRow key={pcParent._id}>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{idx + 1}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{pcParent.category_name}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{pcParent.slug}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {(pcParent.status === true || pcParent.status === 'true') ? 'Hiển thị' : 'Ẩn'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {pcParent.created_at ? new Date(pcParent.created_at).toLocaleDateString() : ''}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button variant="outlined" color="primary" size="small" onClick={() => handleNavigate('/admin/pcparent/detail/', pcParent._id)} sx={{ mr: 1 }}>Xem</Button>
                                        <Button variant="outlined" color="secondary" size="small" onClick={() => handleNavigate('/admin/pcparent/update/', pcParent._id)} sx={{ mr: 1 }}>Sửa</Button>
                                        <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(pcParent._id)}>Xóa</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Typography variant="subtitle1">Không có danh mục sản phẩm cha nào.</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
};

export default PCParentList;