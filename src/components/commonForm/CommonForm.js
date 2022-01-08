import React from 'react';
import { FormFieldsMeta } from '../../api/FormApi';
import DynamicForm from '../../components/dynamicForm/DynamicForm';
import InputField from '../../components/inputField/InputField';
import './CommonForm.scss';

const CommonForm = ({ onFormSubmit, fields, initialData, ButtonLabel, FormHeading }) => {
    return(
        <div className='commonForm__page'>
            <fieldset className='commonForm__wrapper'>
                <legend className='commonForm__heading'>{FormHeading}</legend>
                <div className='commonForm__container'>
                    <DynamicForm
                            fields={fields}
                            onFormSubmit={onFormSubmit}
                            initialData={initialData}
                            render={({state, onInputChanged})=>{
                                return(
                                    <>
                                        {
                                            fields.map((field)=> {
                                                return(
                                                    <InputField
                                                        key={field}
                                                        {...{
                                                            field,
                                                            ...FormFieldsMeta[field],
                                                            ...state?.formError?.[field],
                                                            value: state.formData[field],
                                                            onInputChanged,
                                                        }}
                                                    />
                                                );
                                            })
                                        }
                                        <button  className='commonForm__btn' type='submit' disabled={!state.canSubmit}>{ButtonLabel}</button>
                                    </>
                                );
                            }}
                        />
                </div>
            </fieldset>
        </div>
    );
};

CommonForm.defaultProps = {
    ButtonLabel: 'Submit'
};

export default CommonForm;