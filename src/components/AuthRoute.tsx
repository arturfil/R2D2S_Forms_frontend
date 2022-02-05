import { Outlet, RouteProps } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

export default function AuthRoute() {
  const isAuth = localStorage.getItem("jwtforms") ? true : false;
  return isAuth ? <Outlet /> : <LoginPage />;
}
