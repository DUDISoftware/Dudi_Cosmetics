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
import { getPCChilds, deletePCChild } from '../../../api/pcChildApi';
import { getPCParentById } from '../../../api/pcParentApi';

const PCChildList = () => {
    const [pcChildren, setPCChildren] = useState([]);
    const [parentNames, setParentNames] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch PCChild list from API
        const fetchPCChildren = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token không tồn tại. Vui lòng đăng nhập lại.');
                return;
            }

            try {
                const data = await getPCChilds(token);
                setPCChildren(data.data);

                // Lấy danh sách parent_id duy nhất
                const parentIds = [
                    ...new Set(
                        data.data
                            .filter(child => child.parent_id)
                            .map(child => child.parent_id)
                    ),
                ];

                // Lấy tên danh mục cha cho từng parent_id
                const parentNameMap = {};
                await Promise.all(
                    parentIds.map(async (pid) => {
                        try {
                            const parentRes = await getPCParentById(pid, token);
                            if (parentRes.status) {
                                parentNameMap[pid] = parentRes.data.category_name;
                            } else {
                                parentNameMap[pid] = 'Không xác định';
                            }
                        } catch {
                            parentNameMap[pid] = 'Không xác định';
                        }
                    })
                );
                setParentNames(parentNameMap);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách danh mục con:', error.message);
            }
        };

        fetchPCChildren();
    }, []);

    // Navigate to different pages (View, Edit, Add)
    const handleNavigate = (path, id = '') => {
        navigate(`${path}${id}`);
    };

    // Delete a PCChild
    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa danh mục con này?')) {
            const token = localStorage.getItem('token');
            try {
                const response = await deletePCChild(id, token);
                if (response.status) {
                    setPCChildren(prev => prev.filter(pcChild => pcChild._id !== id));
                } else {
                    console.error('Không thể xóa danh mục con:', response.message);
                }
            } catch (error) {
                console.error('Lỗi khi xóa danh mục con:', error.message);
            }
        }
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                onClick={() => handleNavigate('/admin/pcchild/add')}
            >
                Thêm Danh Mục Con
            </Button>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Danh Sách Danh Mục Con
            </Typography>
            <Box sx={{ overflow: 'auto', width: '100%' }}>
                <Table aria-label="bảng danh mục con" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>STT</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>Tên Danh Mục</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>Slug</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>Danh Mục Cha</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>Trạng Thái</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>Hành Động</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pcChildren.length > 0 ? (
                            pcChildren.map((pcChild, idx) => (
                                <TableRow key={pcChild._id}>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{idx + 1}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{pcChild.category_name}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{pcChild.slug}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {pcChild.parent_id ? (parentNames[pcChild.parent_id] || 'Đang tải...') : 'Chưa có danh mục cha'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {(pcChild.status === true || pcChild.status === 'true') ? 'Hiển thị' : 'Ẩn'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button variant="outlined" color="primary" size="small" onClick={() => handleNavigate('/admin/pcchild/detail/', pcChild._id)} sx={{ mr: 1 }}>Xem</Button>
                                        <Button variant="outlined" color="secondary" size="small" onClick={() => handleNavigate('/admin/pcchild/update/', pcChild._id)} sx={{ mr: 1 }}>Sửa</Button>
                                        <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(pcChild._id)}>Xóa</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Typography variant="subtitle1">Không có danh mục con nào.</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
};

export default PCChildList;