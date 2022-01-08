import React, { useEffect } from 'react';
import './InputField.scss';

const InputField = ({field, label, errorMessage, isValid, type, value, validations, onInputChanged}) => {

    const handleChangeInput = (value) => {
        const validationData = fieldValidations({
            key: field,
            name: label,
            value,
            validations
        });
        onInputChanged(validationData);
    }

    useEffect(()=>{
        if(value){
            handleChangeInput(value);
        }
    }, [value]);

    return(
        <div className={`fieldGroup fieldGroup--${isValid ? '' : 'hasError'}`}>
            <fieldset className='fieldGroup__fieldset'>
                <legend className='fieldGroup__label'>
                    {label}
                </legend>
                <input
                    className='fieldGroup__input'
                    type={type}
                    value={value}
                    onFocus={(e)=>handleChangeInput(e.currentTarget.value)}
                    onChange={(e)=>handleChangeInput(e.currentTarget.value)}
                />
            </fieldset>
            { errorMessage && (<div className='fieldGroup__error'>{errorMessage}</div>) }
        </div>
        
    );
};
export default InputField;

const validationRegEx = {
    name(value){
        var regex = /^[a-zA-Z ]{5,}$/;
        return regex.test(value);
    },
    required(value){
        return value.length>0;
    },
    password(value){
        var regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+).{8,}$/;
        return regex.test(value);
    },
    email(value){
        var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var _v = String(value).toLowerCase();
        return regex.test(_v);
    },
    mobileNumber(value){
        var regex = /^[0-9]{10,10}$/;
        return regex.test(value);
    },
    userName(value){
        var regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/g;
        return regex.test(value);
    }
};

const errorMessages = {
    required: `should not be empty.`,
    name: `only characters are allowed.`,
    password: `atleast one number and one alphabet is required.`,
    email: `should valid email address.`,
    mobileNumber: `only numbers are allowed and should be of 10 digits.`,
    userName: `alpha numeric with one special character is allowed.`
};

function fieldValidations({key, name, value, validations}) {
    const data = {
        formData: {
            [key]: value
        },
        formError: {
            [key]: {
                errorMessages: '',
                isValid: true
            }
        }
    };
    
    for(let i=0; i<validations.length;i++){
        const option = validations[i];
        const result = validationRegEx[option] && validationRegEx[option](value);
        if(result === false) {
            data.formError[key].errorMessage = `${name} ${errorMessages[option]}`;
            data.formError[key].isValid = false;
            break;
        }
    }

    return data;
};


