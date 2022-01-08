import React, { useEffect, useState } from 'react';
import { protectRouter } from '../routers/ProtectRouter';
import { UserProfileApi, UserProfileFormFields } from '../api/UserProfileApi';
import { RegistrationApi} from '../api/RegistrationApi';
import CommonForm from '../components/commonForm/CommonForm';
import './UserProfile.scss';

const UserProfile = ({logedInUserId}) => {
    const [initUserData, setInitUserData] = useState();

    const onFormSubmit = async (payload) => {
        try {
            await UserProfileApi.updateLogedInUserData(logedInUserId, payload);
        } catch(err) {
            console.log('UserProfile',err);
        }
        
    };

    const loadIntialData = async() => {
        const response = await UserProfileApi.getLogedInUserData(logedInUserId);
        const logedinUserData = response.data();
        setInitUserData(logedinUserData);
    }

    useEffect(()=>{
        loadIntialData();
    },[logedInUserId]);

    return(
       <div className='userProfile__page'>
            <div className='userProfile__logout'>
                <button className='userProfile__logout__btn' onClick={RegistrationApi.logOut}>Logout</button>
            </div>
            <CommonForm
                initialData={initUserData}
                fields={UserProfileFormFields}
                FormHeading='User Profile'
                onFormSubmit={onFormSubmit}
            />
       </div>
    );
};

export default protectRouter(UserProfile);