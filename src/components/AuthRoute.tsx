import { Outlet, RouteProps } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { useAppSelector } from "../store/store";

export default function AuthRoute() {
  const { loggedIn } = useAppSelector(state => state.account);
  const isAuth = loggedIn ? true : false;
  return isAuth ? <Outlet /> : <LoginPage />;
}
