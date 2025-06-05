import React, { useEffect, useState } from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getPosts, deletePost } from '../../../api/PostsApi';

const PostsList = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the list of posts
        const fetchPosts = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found. Please log in again.');
                return;
            }

            try {
                const data = await getPosts(token);
                setPosts(data.data);
            } catch (error) {
                console.error('Error fetching posts:', error.message);
            }
        };

        fetchPosts();
    }, []);

    // Navigate to different pages (details, update, add)
    const handleNavigate = (path, id = '') => {
        navigate(`${path}${id}`);
    };

    // Delete post
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            const token = localStorage.getItem('token');
            try {
                const response = await deletePost(id, token);
                if (response.status) {
                    setPosts(prev => prev.filter(post => post._id !== id));
                } else {
                    console.error('Cannot delete post:', response.message);
                }
            } catch (error) {
                console.error('Error deleting post:', error.message);
            }
        }
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                onClick={() => handleNavigate('/admin/posts/add')}
            >
                Add Post
            </Button>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Posts List
            </Typography>
            <Box sx={{ overflow: 'auto', width: '100%' }}>
                <Table aria-label="posts table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            {['STT', 'Title', 'Description', 'Image', 'Status', 'Created At', 'Actions'].map((header, idx) => (
                                <TableCell key={idx}>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {header}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.length > 0 ? (
                            posts.map((post, idx) => (
                                <TableRow key={post._id}>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {idx + 1}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {post.title}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {post.description ? post.description.substring(0, 50) + (post.description.length > 50 ? '...' : '') : ''}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {post.image_url && (
                                            <Box
                                                component="img"
                                                sx={{ height: 50, maxWidth: 80, objectFit: 'contain' }}
                                                src={post.image_url}
                                                alt={post.title}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={post.status === 'active' ? "Active" : "Inactive"}
                                            color={post.status === 'active' ? "success" : "error"}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                            {new Date(post.created_at).toLocaleDateString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="outlined" color="primary" size="small" onClick={() => handleNavigate('/admin/posts/detail/', post._id)} sx={{ mr: 1 }}>View</Button>
                                        <Button variant="outlined" color="secondary" size="small" onClick={() => handleNavigate('/admin/posts/update/', post._id)} sx={{ mr: 1 }}>Edit</Button>
                                        <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(post._id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <Typography variant="subtitle1">No posts available.</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
};

export default PostsList;
