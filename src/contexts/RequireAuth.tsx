import { useContext, useEffect } from 'react';
import { AuthContext } from "./AuthContext";
import { Home } from './../pages/Home/index';
import { SignIn } from './../pages/SignIn/index';
import { Navigate, useNavigate } from 'react-router-dom';
import { Sign } from 'crypto';


export const RequireAuth = ({children}: {children: JSX.Element}) => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    
    if(!auth.user) {
        navigate('/login')
        return <SignIn />
    } else {
        return children
    }
   
    
}