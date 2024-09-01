import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/store/store";


export const PublicRouteUser: FC = () => {
    const { isAuthenticated, role } = useAppSelector((state) => state.userSlice );
    if (role === "user") {
      return isAuthenticated ? <Navigate to={"/"} replace /> : <Outlet />;
    }
    return <Outlet/>
  }


  export const PublicRouteOwner: FC = () => {
    const { isAuthenticated, role } = useAppSelector((state) => state.ownerSlice );
    if (role === "owner") {
      return isAuthenticated ? <Navigate to={"/owner"} replace /> : <Outlet />;
    }
    return <Outlet/>
  }


  export const PublicRouteAdmin: FC = () => {
    const { isAuthenticated, role } = useAppSelector((state) => state.adminSlice );
    if (role === "admin") {
      return isAuthenticated ? <Navigate to={"/admin/"} replace /> : <Outlet />;
    }
    return <Outlet/>
  }


