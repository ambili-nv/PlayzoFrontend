import { FC, startTransition } from "react";
import { useAppSelector } from "../redux/store/store";
import { Navigate,Outlet } from "react-router-dom";

export const ProtectRoute:FC=()=>{
    const {isAuthenticated,role} = useAppSelector((state)=>state.userSlice);

    return isAuthenticated && role === 'user'? (
        <Outlet/>
    ) :(
        <Navigate to = {'/'} replace/> 
    )
};


export const OwnerProtectRoute:FC=()=>{
    const {isAuthenticated,role} = useAppSelector((state)=>state.ownerSlice);

    return isAuthenticated && role === 'owner'?(
        <Outlet/>
    ) : (
        <Navigate to = {'/owner/login'} replace />
    )
};


export const AdminProtectRoute : FC = ()=>{
    const {isAuthenticated,role} = useAppSelector((state)=>state.adminSlice);

    return isAuthenticated !== null && role === 'admin'?(
        <Outlet/>
    ) : (
        <Navigate to = {'/admin/login'} replace />
    )
}

