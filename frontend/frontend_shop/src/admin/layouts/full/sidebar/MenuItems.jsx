import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Danh Sách Sản Phẩm',
    icon: IconLayoutDashboard,
    href: '/admin/voucherlist',
  },
  {
    id: uniqueId(),
    title: 'Danh Sách Loại Sản Phẩm',
    icon: IconLayoutDashboard,
    href: '/admin/voucherlist',
  },
  {
    id: uniqueId(),
    title: 'Danh Sách Brand',
    icon: IconLayoutDashboard,
    href: '/admin/voucherlist',
  },
  {
    id: uniqueId(),
    title: 'Danh Sách Bài Viết',
    icon: IconLayoutDashboard,
    href: '/admin/voucherlist',
  },
  {
    id: uniqueId(),
    title: 'Danh Sách loại Bài Viết',
    icon: IconLayoutDashboard,
    href: '/admin/PostsCategory-list',
  },
  {
    id: uniqueId(),
    title: 'Danh Sách Mã voucher',
    icon: IconLayoutDashboard,
    href: '/admin/voucherlist',
  },
  {
    id: uniqueId(),
    title: 'Danh Sách Banners ',
    icon: IconLayoutDashboard,
    href: '/admin/Banners/Banners_list',
  },

  {
    navlabel: true,
    subheader: 'Chức Năng Khác',
  },
  {
    id: uniqueId(),
    title: 'Tổng Quan',
    icon: IconTypography,
    href: '/admin/voucherlist',
  },
  {
    id: uniqueId(),
    title: 'Doanh Thu',
    icon: IconCopy,
    href: '/admin/voucherlist',
  },
  {
    id: uniqueId(),
    title: 'Sản Phẩm Hot',
    icon: IconCopy,
    href: '/admin/voucherlist',
  },
  {
    id: uniqueId(),
    title: 'bình Luận',
    icon: IconCopy,
    href: '/admin/voucherlist',
  },
];

export default Menuitems;
