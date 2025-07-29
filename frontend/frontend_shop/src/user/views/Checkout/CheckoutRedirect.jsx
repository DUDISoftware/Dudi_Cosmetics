import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { paymentRedirect } from '../../../api/checkoutApi';

const CheckoutRedirect = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // const code = queryParams.get('code');
  const id = queryParams.get('id');
  // const cancel = queryParams.get('cancel');
  const status = queryParams.get('status');
  const orderCode = queryParams.get('orderCode');

  // Navigate to home page after 5s

  useEffect(() => {
    const paymentRedirected = async () => {
      try {
        console.log('Redirecting with orderCode:', orderCode, 'status:', status, 'paymentLinkId:', id);
        if (!orderCode || !status) {
          console.error('Missing orderCode or status');
          return;
        }
        const response = await paymentRedirect({ orderCode, status, paymentLinkId: id });
        if (response.status) {
          console.log('Redirect successful:', response.message);
        } else {
          console.error('Redirect failed:', response.message);
        }
        setTimeout(() => {
          window.location.href = '/'; // Redirect to home page
        }, 5000);
      } catch (error) {
        console.error('Error during redirect:', error);
      }
    };

    paymentRedirected();
  }, [orderCode, status, id]);
  return (
    <>
      <Header />
      <div className="checkout-failed w-full h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold mb-4">Giao dịch {status === 'PAID' || status === 'PENDING' ? 'thành công' : 'thất bại'}</h1>
        <p className="text-lg mb-2">Mã giao dịch: {orderCode}</p>
        <p className="text-lg mb-2">Trạng thái: {status}</p>
        <p className="text-lg mb-2">Vui lòng đợi trong giây lát, bạn sẽ được chuyển hướng về trang chủ.</p>
      </div>
      <Footer />
    </>
  );
}

export default CheckoutRedirect;