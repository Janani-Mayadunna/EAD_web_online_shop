import { Route, Routes } from 'react-router-dom';
import ROUTE from './paths';
import Landing from '../pages/landing/Landing';
import AdminDashboard from '../pages/admin/dashboard/AdminDashboard';
import VendorRegister from '../pages/admin/vendor-register/VendorRegister';
import AdminAllProducts from '../pages/admin/all-products/AdminAllProducts';
import CSRDashboard from '../pages/sales-rep/order-details/CSROrderDetails';
import CSROrderCancel from '../pages/sales-rep/order-cancel/CSROrderCancel';
import VendorDashboard from '../pages/vendor/dashboard/VendorDashboard';
import VendorCategory from '../pages/vendor/category/VendorCategory';
import VendorProducts from '../pages/vendor/products/VendorProducts';
import VendorOrders from '../pages/vendor/orders/VendorOrders';
import VendorProfile from '../pages/vendor/vendor-profile/VendorProfile';
import VendorRates from '../pages/vendor/rate-reviews/VendorRates';

const routers = [
  {
    path: ROUTE.LANDING,
    component: Landing,
  },
  {
    path: ROUTE.ADMIN_DASHBOARD,
    component: AdminDashboard,
  },
  {
    path: ROUTE.VENDOR_REGISTER,
    component: VendorRegister,
  },
  {
    path: ROUTE.ADMIN_ALL_PRODUCTS,
    component: AdminAllProducts,
  },
  {
    path: ROUTE.CSR_ORDER_DETAILS,
    component: CSRDashboard,
  },
  {
    path: ROUTE.CSR_CANCEL_REQUESTS,
    component: CSROrderCancel,
  },
  {
    path: ROUTE.VENDOR_DASHBOARD,
    component: VendorDashboard,
  },
  {
    path: ROUTE.VENDOR_CATEGORY,
    component: VendorCategory,
  },
  {
    path: ROUTE.VENDOR_PRODUCTS,
    component: VendorProducts,
  },
  {
    path: ROUTE.VENDOR_ORDERS,
    component: VendorOrders,
  },
  {
    path: ROUTE.VENDOR_PROFILE,
    component: VendorProfile,
  },
  {
    path: ROUTE.VENDOR_RATES,
    component: VendorRates,
  },
];

const Router = () => (
  <Routes>
    {routers.map((route) => (
      <Route path={route.path} element={<route.component />} key={route.path} />
    ))}
  </Routes>
);

export default Router;
