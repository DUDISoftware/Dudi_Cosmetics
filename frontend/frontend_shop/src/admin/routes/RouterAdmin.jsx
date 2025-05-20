import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages Voucher***** */
const VoucherList = Loadable(lazy(() => import('../views/voucher/VoucherList')));
const AddVouchers = Loadable(lazy(() => import('../views/voucher/add-Vouchers')));
const UpdateVouchers = Loadable(lazy(() => import('../views/voucher/update-Vouchers')));
const VouchersDetail = Loadable(lazy(() => import('../views/voucher/Vouchers-detail')));

/* ****Pages Banner***** */
const AddBanners = Loadable(lazy(() => import('../views/Banners/add-Banners')));
const Banners_list = Loadable(lazy(() => import('../views/Banners/Banners-list')));
const UpdateBanners = Loadable(lazy(() => import('../views/Banners/update-Banners')));
const BannersDetail = Loadable(lazy(() => import('../views/Banners/Banners-detail')));

/* ****Pages ProductBrand***** */
const AddProductBrand = Loadable(lazy(() => import('../views/ProductBrand/add-ProductBrand')));
const ProductBrandList = Loadable(lazy(() => import('../views/ProductBrand/ProductBrand-list')));
const UpdateProductBrand = Loadable(lazy(() => import('../views/ProductBrand/update-ProductBrand')));
const ProductBrandDetail = Loadable(lazy(() => import('../views/ProductBrand/ProductBrand-detail')));

/* ****Pages Product***** */
const Addproduct = Loadable(lazy(() => import('../views/Product/add-product')));
const ProductsList = Loadable(lazy(() => import('../views/Product/products-list')));
const UpdateProduct = Loadable(lazy(() => import('../views/Product/update-product')));
const ProductsDetail = Loadable(lazy(() => import('../views/Product/products-detail')));

/* ****Pages PostsCategory***** */
const AddPostsCategory = Loadable(lazy(() => import('../views/PostsCategory/add-PostsCategory')));
const PostsCategoryList = Loadable(lazy(() => import('../views/PostsCategory/PostsCategory-list')));
const UpdatePostsCategory = Loadable(lazy(() => import('../views/PostsCategory/update-PostsCategory')));
const PostsCategoryDetail = Loadable(lazy(() => import('../views/PostsCategory/PostsCategory-detail')));

/* ****Pages Posts***** */
const AddPosts = Loadable(lazy(() => import('../views/Posts/add-Posts')));
const PostsList = Loadable(lazy(() => import('../views/Posts/Posts-list')));
const UpdatePosts = Loadable(lazy(() => import('../views/Posts/update-Posts')));
const PostsDetail = Loadable(lazy(() => import('../views/Posts/Posts-detail')));

/* ****Pages PCParent***** */
const AddPCParent = Loadable(lazy(() => import('../views/PCParent/add-PCParent')));
const PCParentList = Loadable(lazy(() => import('../views/PCParent/PCParent-list')));
const UpdatePCParent = Loadable(lazy(() => import('../views/PCParent/update-PCParent')));
const PCParentDetail = Loadable(lazy(() => import('../views/PCParent/PCParent-detail')));

/* ****Pages PCChild***** */
const AddPCChild = Loadable(lazy(() => import('../views/PCChild/add-PCChild')));
const PCChildList = Loadable(lazy(() => import('../views/PCChild/PCChild-list')));
const UpdatePCChild = Loadable(lazy(() => import('../views/PCChild/update-PCChild')));
const PCChildDetail = Loadable(lazy(() => import('../views/PCChild/PCChild-detail')));

const RouterAdmin = [
  {
    path: '/admin',
    element: <FullLayout />,
    children: [
      { path: '/admin', element: <Navigate to="/voucherlist" /> },

      // Voucher routes
      { path: '/admin/voucherlist', exact: true, element: <VoucherList /> },
      { path: '/admin/voucher/add', exact: true, element: <AddVouchers /> },
      { path: '/admin/voucher/update/:id', exact: true, element: <UpdateVouchers /> },
      { path: '/admin/voucher/detail/:id', exact: true, element: <VouchersDetail /> },

      // Banners routes
      { path: '/admin/Banners/Banners_list', exact: true, element: <Banners_list /> },
      { path: '/admin/Banners/add', exact: true, element: <AddBanners /> },
      { path: '/admin/Banners/update/:id', exact: true, element: <UpdateBanners /> },
      { path: '/admin/Banners/detail/:id', exact: true, element: <BannersDetail /> },

      // ProductBrand routes
      { path: '/admin/ProductBrand/ProductBrand-list', exact: true, element: <ProductBrandList /> },
      { path: '/admin/ProductBrand/add', exact: true, element: <AddProductBrand /> },
      { path: '/admin/ProductBrand/update/:id', exact: true, element: <UpdateProductBrand /> },
      { path: '/admin/ProductBrand/detail/:id', exact: true, element: <ProductBrandDetail /> },

      // Product routes
      { path: '/admin/products/products-list', exact: true, element: <ProductsList /> },
      { path: '/admin/products/add', exact: true, element: <Addproduct /> },
      { path: '/admin/products/update/:id', exact: true, element: <UpdateProduct /> },
      { path: '/admin/products/detail/:id', exact: true, element: <ProductsDetail /> },

      // PostsCategory routes
      { path: '/admin/PostsCategory/PostsCategory-list', exact: true, element: <PostsCategoryList /> },
      { path: '/admin/PostsCategory/add', exact: true, element: <AddPostsCategory /> },
      { path: '/admin/PostsCategory/update/:id', exact: true, element: <UpdatePostsCategory /> },
      { path: '/admin/PostsCategory/detail/:id', exact: true, element: <PostsCategoryDetail /> },

      // Posts routes
      { path: '/admin/Posts/Posts-list', exact: true, element: <PostsList /> },
      { path: '/admin/Posts/add', exact: true, element: <AddPosts /> },
      { path: '/admin/Posts/update/:id', exact: true, element: <UpdatePosts /> },
      { path: '/admin/Posts/detail/:id', exact: true, element: <PostsDetail /> },

      // PCParent routes
      { path: '/admin/PCParent/PCParent-list', exact: true, element: <PCParentList /> },
      { path: '/admin/PCParent/add', exact: true, element: <AddPCParent /> },
      { path: '/admin/PCParent/update/:id', exact: true, element: <UpdatePCParent /> },
      { path: '/admin/PCParent/detail/:id', exact: true, element: <PCParentDetail /> },

      // PCChild routes
      { path: '/admin/PCChild/PCChild-list', exact: true, element: <PCChildList /> },
      { path: '/admin/PCChild/add', exact: true, element: <AddPCChild /> },
      { path: '/admin/PCChild/update/:id', exact: true, element: <UpdatePCChild /> },
      { path: '/admin/PCChild/detail/:id', exact: true, element: <PCChildDetail /> },
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