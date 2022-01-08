import React from 'react';
import { useNavigate } from "react-router-dom";
import { RegistrationApi, RegisterFormFields } from '../api/RegistrationApi';
import CommonForm from '../components/commonForm/CommonForm';
import { protectRouter } from '../routers/ProtectRouter';
import './Registration.scss';

const Registration = () => {
    const navigate = useNavigate();
    const onFormSubmit = async (payload) => {
        const { email, password, name } = payload;
        try {
            const response = await RegistrationApi.createUser(email, password);
            await RegistrationApi.addUser(response.user.uid,{
              uid: response.user.uid,
              name,
              email,
              password,
            });
            navigate('/userProfile');
        } catch(err) {
            console.log('Registration',err);
        }
        
    };

    return(
        <CommonForm
            fields={RegisterFormFields}
            onFormSubmit={onFormSubmit}
            ButtonLabel='Sign In'
            FormHeading='Registration'
        />
    );
};

export default protectRouter(Registration);