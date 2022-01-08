import React, { useEffect, useReducer } from 'react';

import './DynamicForm.scss';
const actionType = {
    LOAD_INIT_DATA: 'LOAD_INIT_DATA',
    UPDATE_INPUT: 'UPDATE_INPUT'
};

const DynamicForm = ({ fields, render, onFormSubmit, initialData }) => {
    const [state, dispatch] = useReducer(reducer, initialState(fields));

    const onInputChanged = (payload) => {
        dispatch({
            type:actionType.UPDATE_INPUT,
            payload
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(state.canSubmit){
            onFormSubmit(state.formData);
        }
    };

    useEffect(()=>{
        if(initialData){
            dispatch({
                type:actionType.LOAD_INIT_DATA,
                payload: initialData
            });
        }
    }, [initialData]);

    return(
        <div className='formComponent'>
           <form onSubmit={handleFormSubmit}>
               {render({state, onInputChanged})}
            </form>
        </div>
    );
};

function canSubmitForm(fieldObject) {
    for (const key in fieldObject) {
        if (!fieldObject[key].isValid) {
            return false;
        }
    }
    return true;
};

function reducer(state, action) {
    switch (action.type) {
        case actionType.LOAD_INIT_DATA:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    ...action.payload
                }
            };
        case actionType.UPDATE_INPUT:
          const _state = {
                ...state,
                formData: {
                    ...state.formData,
                    ...action.payload.formData
                },
                formError: {
                    ...state.formError,
                    ...action.payload.formError
                }
            };
            _state.canSubmit = canSubmitForm(_state.formError);

            return _state;
        default:
        return state;
    }
}

function initialState(fields) {
    const state = {
        formData: {},
        formError: {},
        canSubmit:false
    };
    for(let i=0; i<fields.length;i++){
        state.formData[fields[i]] = '';
        state.formError[fields[i]] = {
            isValid: false
        };
    }
    return state;
};


export default DynamicForm;