export const FormFieldsMeta = {
    name: {
        label: 'Name',
        type: 'text',
        validations: ['required','name']
    },
    email: {
        label: 'Email Id',
        type: 'email',
        validations: ['required', 'email']
    },
    mobileNumber: {
        label: 'Mobile Number',
        type: 'tel',
        validations: ['required','mobileNumber']
    },
    userName: {
        label: 'User Name',
        type: 'text',
        validations: ['required','userName']
    },
    password: {
        label: 'Password',
        type: 'password',
        validations: ['required','password']
    }
};