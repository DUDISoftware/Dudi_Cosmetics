import React, { useState, useEffect } from 'react';
import {
    Typography,
    Box,
    TextField,
    Button,
    Snackbar,
    Alert,
    FormControlLabel,
    Switch,
    CircularProgress,
    InputLabel,
    MenuItem,
    Select,
    FormControl
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../../api/productsApi';
import { getProductBrands } from '../../../api/ProductBrandApi';
import { getPCChilds } from '../../../api/pcChildApi';

const AddProduct = () => {
    const [product, setProduct] = useState({
        product_name: '',
        short_description: '',
        long_description: '',
        is_hot: false,
        is_most_viewed: false,
        status: 'active',
        base_price: '',
        store_quantity: '',
        category_id: '',
        brand_id: ''
    });
    const [mainImage, setMainImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [productBrands, setProductBrands] = useState([]);
    const [pcChilds, setPCChilds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const brandsData = await getProductBrands(token);
                setProductBrands(brandsData.data);
                const categoriesData = await getPCChilds(token);
                setPCChilds(categoriesData.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!validTypes.includes(selectedFile.type)) {
            setSnackbarMessage('Chỉ chấp nhận ảnh JPG, PNG, GIF');
            setOpenSnackbar(true);
            return;
        }
        if (selectedFile.size > 5 * 1024 * 1024) {
            setSnackbarMessage('Ảnh không được vượt quá 5MB');
            setOpenSnackbar(true);
            return;
        }

        setMainImage(selectedFile);
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result);
        reader.readAsDataURL(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!product.product_name.trim()) {
            setSnackbarMessage('Vui lòng nhập tên sản phẩm');
            setOpenSnackbar(true);
            return;
        }
        if (!mainImage) {
            setSnackbarMessage('Vui lòng chọn ảnh chính');
            setOpenSnackbar(true);
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            Object.keys(product).forEach(key => {
                formData.append(key, product[key]);
            });
            formData.append('image_url', mainImage); // Tên trường theo model/backend

            const token = localStorage.getItem('token');
            await addProduct(formData, token);

            setSnackbarMessage('Thêm sản phẩm thành công!');
            setOpenSnackbar(true);
            setTimeout(() => navigate('/admin/products/products-list'), 1500);
        } catch (error) {
            setSnackbarMessage(error.response?.data?.message || 'Lỗi khi thêm sản phẩm. Vui lòng thử lại');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Thêm Sản Phẩm Mới
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth label="Tên sản phẩm" name="product_name" value={product.product_name}
                    onChange={handleChange} required sx={{ mb: 2 }} />
                <TextField fullWidth label="Mô tả ngắn" name="short_description" value={product.short_description}
                    onChange={handleChange} sx={{ mb: 2 }} />
                <TextField fullWidth label="Mô tả chi tiết" name="long_description" value={product.long_description}
                    onChange={handleChange} multiline rows={3} sx={{ mb: 2 }} />
                <TextField fullWidth label="Giá gốc" name="base_price" value={product.base_price}
                    onChange={handleChange} type="number" sx={{ mb: 2 }} />
                <TextField fullWidth label="Số lượng trong kho" name="store_quantity" value={product.store_quantity}
                    onChange={handleChange} type="number" sx={{ mb: 2 }} />

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Thương hiệu</InputLabel>
                    <Select
                        name="brand_id"
                        value={product.brand_id}
                        onChange={handleChange}
                        label="Thương hiệu"
                    >
                        {productBrands.map(brand => (
                            <MenuItem key={brand._id} value={brand._id}>{brand.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Danh mục</InputLabel>
                    <Select
                        name="category_id"
                        value={product.category_id}
                        onChange={handleChange}
                        label="Danh mục"
                    >
                        {pcChilds.map(category => (
                            <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControlLabel control={
                    <Switch checked={product.is_hot} onChange={handleChange} name="is_hot" color="primary" />
                } label="Sản phẩm nổi bật" sx={{ mb: 2 }} />

                <FormControlLabel control={
                    <Switch checked={product.is_most_viewed} onChange={handleChange} name="is_most_viewed" color="primary" />
                } label="Sản phẩm nhiều lượt xem" sx={{ mb: 2 }} />

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Trạng thái</InputLabel>
                    <Select
                        name="status"
                        value={product.status}
                        onChange={handleChange}
                        label="Trạng thái"
                    >
                        <MenuItem value="active">Hoạt động</MenuItem>
                        <MenuItem value="inactive">Không hoạt động</MenuItem>
                    </Select>
                </FormControl>

                <Box sx={{ mb: 2 }}>
                    <Button variant="outlined" component="label" disabled={loading}>
                        Chọn Ảnh Chính
                        <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                    </Button>
                    {imagePreview && (
                        <Box component="img" src={imagePreview} alt="Preview" sx={{
                            mt: 2, maxHeight: 200, objectFit: 'contain', display: 'block'
                        }} />
                    )}
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary" type="submit" disabled={loading} sx={{ mr: 2 }}>
                        {loading ? <CircularProgress size={24} /> : 'Thêm Sản Phẩm'}
                    </Button>
                    <Button variant="outlined" onClick={() => navigate('/admin/products/products-list')} disabled={loading}>
                        Quay Lại
                    </Button>
                </Box>
            </form>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)}
                    severity={snackbarMessage.includes('thành công') ? 'success' : 'error'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddProduct;
