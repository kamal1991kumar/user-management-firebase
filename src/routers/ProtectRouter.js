import React, { useEffect, useState } from "react";
import { RegistrationApi } from '../api/RegistrationApi';
import { useNavigate, useLocation } from "react-router-dom";

export const protectRouter = (ChildComponent) => (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [logedInUserId, setLogedInUserId] = useState();

    const authRedirect = async () => {
        await RegistrationApi.isUserLogedIn((userData)=>{
            let redirectUrl = '/';
            if(userData){
                setLogedInUserId(userData.uid);
                if(location.pathname === '/'){
                    redirectUrl = 'userProfile';
                } else {
                    redirectUrl = location.pathname;
                }
            }
            navigate(redirectUrl);
        });
        
    };

    useEffect(()=> {
        authRedirect();
    }, []);

    return (
        <React.Fragment>
            <ChildComponent {...props} logedInUserId={logedInUserId} />
        </React.Fragment>
    );
};
