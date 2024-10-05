import { Route, Routes } from "react-router-dom";
import ROUTE from "./paths";
import Landing from "../pages/landing/Landing";
import AdminDashboard from '../pages/admin/dashboard/AdminDashboard';
import VendorRegister from '../pages/admin/vendor-register/VendorRegister';
import AdminAllProducts from '../pages/admin/all-products/AdminAllProducts';
import VendorDashboard from '../pages/vendor/dashboard/VendorDashboard';

const routers = [
  {
    path: ROUTE.LANDING,
    component: Landing,
  },
  {
    path:ROUTE.ADMIN_DASHBOARD,
    component: AdminDashboard,
  },
  {
    path: ROUTE.VENDOR_REGISTER,
    component: VendorRegister
  },
  {
    path: ROUTE.ADMIN_ALL_PRODUCTS,
    component: AdminAllProducts,
  },
  {
    path: ROUTE.VENDOR_DASHBOARD,
    component: VendorDashboard,
  }
];

const Router = () => (
  <Routes>
    {routers.map((route) => (
      <Route path={route.path} element={<route.component />} key={route.path} />
    ))}
  </Routes>
);

export default Router;