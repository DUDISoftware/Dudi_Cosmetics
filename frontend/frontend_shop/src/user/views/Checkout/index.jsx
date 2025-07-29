import { useNavigate, createSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header'
import Footer from '../../components/Footer';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { checkoutPayOSAPI, checkoutCodAPI } from '../../../api/checkoutApi'

const exampleProducts = [
  {
    id: 1,
    name: 'Sản phẩm 1',
    quantity: 1,
    price: 20.00
  },
  {
    id: 2,
    name: 'Sản phẩm 2',
    quantity: 1,
    price: 15.00
  }
]

const parseData = (data) => {
  if (!data || !Array.isArray(data)) {
    console.error('Invalid data format:', data);
    return [];
  }
  return data.map(item => ({
    id: item.product_id._id,
    name: item.product_name,
    quantity: item.quantity || 1,
    price: item.product_id.base_price,
    imgUrl: item.product_id.image_url || ''
  }));
}

const Checkout = () => {
  const location = useLocation();
  const { data } = location.state;
  const CART_ID = data[0]?.cart_id || null;
  const navigate = useNavigate();
  // const [ products, setProducts ] = useState(parseData(data) || exampleProducts);
  const products = parseData(data) || [];

  const [ paymentMethod, setPaymentMethod ] = useState('cod');
  const [ address, setAddress ] = useState('');
  const [ fullName, setFullName ] = useState('');
  const [ phoneNumber, setPhoneNumber ] = useState('');
  // const [ total, setTotal ] = useState(products.reduce((acc, item) => acc + (item.quantity * item.price), 0));
  const total = products.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  // const handleChangeQuantity = (product, action) => {
  //   // update total
  //   const updatedProducts = products.map((item) => {
  //     if (item.id === product.id) {
  //       if (action === 'add') {
  //         item.quantity += 1;
  //       } else if (action === 'remove' && item.quantity > 1) {
  //         item.quantity -= 1;
  //       }
  //     }
  //     return item;
  //   });
  //   setProducts(updatedProducts);
  //   const newTotal = updatedProducts.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  //   setTotal(newTotal);
  // }

  const handleCheckout = () => {
    // Handle checkout logic here, e.g., send data to the server

    if (!fullName || !phoneNumber || !address) {
      alert('Vui lòng điền đầy đủ thông tin giao hàng.');
      return;
    }
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert('Số điện thoại không hợp lệ.');
      return;
    }
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    const orderData = {
      user_id: userId,
      cart_id: CART_ID,
      fullName,
      phoneNumber,
      address,
      paymentMethod,
      products: products.map(product => ({
        product_id: product.id,
        product_name: product.name,
        quantity: product.quantity,
        price: product.price
      })),
      amount: total
    };
    if (total <= 0) {
      alert('Thanh toán thành công!');
      navigate('/'); // Redirect to home page
      return;
    }
    if (paymentMethod === 'cod') {
      // Handle COD payment
      console.log('Thanh toán COD:', orderData);
      checkoutCodAPI(orderData, token)
        .then((response) => {
          console.log('Checkout successful:', response);
          alert('Thanh toán thành công!');
          navigate({
              pathname: "redirect",
              search: `?${createSearchParams({
                  orderCode: response.orderCode,
                  status: response.status,
                  id: response.paymentLinkId ? response.paymentLinkId : ''
              })}`
          }); // Redirect to checkout redirect page
          // navigate('/redirect', { state: { orderCode: response.orderCode, status: response.status, id: response.paymentLinkId } }); // Redirect to home page
        })
        .catch((error) => {
          console.error('Checkout failed:', error);
          alert('Thanh toán thất bại. Vui lòng thử lại sau.');
        });
    }
    if (paymentMethod === 'momo') {
      // Handle MOMO payment
      console.log('Thanh toán MOMO:', orderData);
      alert('Chức năng thanh toán MOMO đang được phát triển.');
      return;
    }

    if (paymentMethod === 'bank') {
      // Handle bank transfer payment
      checkoutPayOSAPI(orderData, token)
        .then((response) => {
          window.location.href = response.checkoutUrl; // Redirect to the payment URL'
        })
        .catch((error) => {
          console.error('Checkout failed:', error);
        });
    }
  }

  return (
    <>
      <Header />
      <div className="h-screen px-20 py-10">
        <button
          onClick={handleGoBack}
          className="flex items-center mt-4 px-4 py-2 text-[#686868] cursor-pointer hover:text-black transition-colors duration-300 "
        >
          <ArrowBackIosNewIcon fontSize='small' />
          Comeback
        </button>
        <div className="grid grid-cols-2 gap-2 bg-white p-8 rounded-lg shadow-md">
          <FormControl className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold mb-4">Thông tin giao hàng</h2>
            <TextField id="name" label="Họ và tên" variant="outlined" value={fullName} onChange={(e)=>setFullName(e.target.value)}/>
            <TextField id="phoneNumber" label="Số điện thoại" variant="outlined" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/> 
            <TextField
              id="address"
              label="Địa chỉ giao hàng"
              placeholder="Nhập địa chỉ giao hàng"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              multiline
            />
            <FormLabel id="payment-method-group-label">Phương thức thanh toán</FormLabel>
            <RadioGroup
              aria-labelledby="payment-method-group-label"
              defaultValue="cod"
              name="radio-buttons-group"
            >
              <FormControlLabel onClick={() => setPaymentMethod('momo')} value="momo" control={<Radio />} label="Thanh toán qua MOMO" />
              <FormControlLabel onClick={() => setPaymentMethod('bank')}  value="bank" control={<Radio />} label="Chuyển khoản ngân hàng" />
              <FormControlLabel onClick={() => setPaymentMethod('cod')}  value="cod" control={<Radio />} label="Giao hàng trực tiếp" />
            </RadioGroup>
            <Button onClick={handleCheckout} variant="contained">Thanh toán</Button>
          </FormControl>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Thông tin đơn hàng</h2>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <div className="border-b border-gray-300 mb-4 pb-4">
                {products.map((product) => (
                  <div key={product.id} className="flex justify-between mb-2 items-center">
                    <div className="flex items-center mb-2">
                      <img className="w-16 h-16 mr-2" src={product.imgUrl} alt="" />
                      <h5>{product.name.length > 20 ? `${product.name.slice(0, 20)}...` : product.name}</h5>
                    </div>
                    <div className="flex items-center text-sm ml-8 bg-grey">
                      {/* <RemoveIcon onClick={() => handleChangeQuantity(product, 'remove')} className="cursor-pointer"/> */}
                      <span className="border-x-1 px-2 border-[#D0D0D0]">Số lượng: {product.quantity}</span>
                      {/* <AddIcon onClick={() => handleChangeQuantity(product, 'add')} className="cursor-pointer"/> */}
                      <span className="px-2">{(product.quantity*product.price).toLocaleString()} vnđ</span>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center gap-2">
                  <TextField size='small' id="outlined-basic" label="Mã giảm giá" variant="outlined" />
                  <Button className="ml-10" variant="contained">Áp dụng</Button>
                </div>
              </div>
              <div className="flex flex-col justify-between font-semibold">
                <div className="w-full flex justify-between items-center mb-2">
                  <span>Tạm tính</span>
                  <span>{total} vnđ</span>
                </div>
                <div className="w-full flex justify-between items-center mb-2">
                  <span>Phí vận chuyển</span>
                  <span>0 vnđ</span>
                </div>
                <div className="w-full flex justify-between items-center mb-2">
                  <span>Khuyến mãi & giảm giá</span>
                  <span>0 vnđ</span>
                </div>
                <div className="w-full flex justify-between items-center mb-2">
                  <span>Tổng cộng</span>
                  <span>{total.toLocaleString()} vnđ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Checkout;