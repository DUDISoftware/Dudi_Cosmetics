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
    Button
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, deletePost } from '../../../api/PostsApi';

const PostsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await getPostById(id, token);
                setPost(data.data);
            } catch (error) {
                console.error('Error fetching post details:', error);
                setSnackbarMessage('Unable to load post details');
                setOpenSnackbar(true);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                const token = localStorage.getItem('token');
                await deletePost(post._id, token);
                setSnackbarMessage('Post deleted successfully!');
                setOpenSnackbar(true);
                setTimeout(() => navigate('/admin/Posts/Posts_list'), 1200);
            } catch (error) {
                setSnackbarMessage('Error deleting post');
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

    if (!post) {
        return (
            <Typography variant="h6" color="error" align="center" mt={4}>
                Post not found.
            </Typography>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Card sx={{ maxWidth: 600, margin: '0 auto', p: 2 }}>
                {post.image_url && (
                    <CardMedia
                        component="img"
                        image={post.image_url}
                        alt="Post image"
                        sx={{ maxHeight: 300, objectFit: 'cover' }}
                    />
                )}
                <CardContent>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                        {post.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {post.description || 'No description available.'}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Status: <Switch checked={post.status === 'active'} disabled />
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Created at: {new Date(post.created_at).toLocaleString()}
                    </Typography>
                </CardContent>
            </Card>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                    variant="outlined"
                    onClick={() => navigate('/admin/Posts/Posts_list')}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/admin/posts/update/${post._id}`)}
                >
                    Go to Edit
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={snackbarMessage.includes('success') ? 'success' : 'error'}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default PostsDetail;
