import { Route, Routes } from "react-router-dom";
import ROUTE from "./paths";
import Landing from "../pages/landing/Landing";

const routers = [
  {
    path: ROUTE.LANDING,
    component: Landing,
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