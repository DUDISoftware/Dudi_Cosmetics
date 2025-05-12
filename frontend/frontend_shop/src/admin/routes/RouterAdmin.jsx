import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

// Thư mục components: Cung cấp các thành phần giao diện tái sử dụng, có thể được sử dụng trong các layout hoặc trang.
// Thư mục layouts: Định nghĩa cấu trúc giao diện tổng thể(như FullLayout và BlankLayout), được sử dụng trực tiếp trong RouterAdmin.jsx để bọc các route.
// File RouterAdmin.jsx: Kết hợp các layout từ layouts và các trang từ views để định nghĩa cấu trúc route cho phần admin của ứng dụng.

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages Voucher***** */
const VoucherList = Loadable(lazy(() => import('../views/voucher/VoucherList')));

/* ****Pages Banner***** */
const add_Banners = Loadable(lazy(() => import('../views/Banners/add-Banners')));
const Banners_list = Loadable(lazy(() => import('../views/Banners/Banners-list')));

/* ****Pages PCChild***** */
const add_PCChild = Loadable(lazy(() => import('../views/PCChild/add-PCChild')));

/* ****Pages PCParent***** */
const add_PCParent = Loadable(lazy(() => import('../views/PCParent/add-PCParent')));

/* ****Pages ProductBrand***** */
const add_ProductBrand = Loadable(lazy(() => import('../views/voucher/VoucherList')));

/* ****Pages product***** */
const add_product = Loadable(lazy(() => import('../views/voucher/VoucherList')));

/* ****Pages PostsCategory***** */
const add_PostsCategory = Loadable(lazy(() => import('../views/voucher/VoucherList')));

/* ****Pages Posts***** */
const add_Posts = Loadable(lazy(() => import('../views/voucher/VoucherList')));

const RouterAdmin = [
  {
    path: '/admin',
    element: <FullLayout />,
    children: [
      { path: '/admin', element: <Navigate to="/voucherlist" /> },
      { path: '/admin/voucherlist', exact: true, element: <VoucherList /> },
      { path: '/admin/Banners/Banners_list', exact: true, element: <Banners_list /> },
    ],
  },
  {
    path: '/admin/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default RouterAdmin;
