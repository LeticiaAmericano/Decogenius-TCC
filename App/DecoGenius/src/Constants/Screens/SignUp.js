const SignUpConstants = {
    title: 'Register',
    links: 'Already have an account? Log in',
    signInput: {
        values: {
            name: 'name',
            cpf: 'cpf',
            phone: 'phone',
            email: 'email',
            dateOfBirth: 'dateOfBirth',
            password: 'password',
            confirmPassword: 'confirmPassword',
        },
        labels: {
            name: 'Name*:',
            email: 'Email*:',
            cpf: 'CPF*:',
            rg: 'RG*:',
            phone: 'Phone*:',
            dateOfBirth: 'Date of Birth*:',
            password: 'Password*:',
            confirmPassword: 'Confirm Password*:'
        }
    },
    signButton: {
        placeholders: {
            register: 'Register'
        }
    },
    errorsMessage: {
        name: {
            required: 'Name is required'
        },
        email: {
            valid: 'Enter a valid email',
            required: 'Email is required'
        },
        cpf: {
            required: 'CPF is required',
            max: 'The maximum number of characters for CPF is 11',
            test: {
                name: 'CpfValidation',
                message: 'Enter a valid CPF'
            }
        },
        phone: {
            required: 'Phone number is required.',
            max: 'The maximum number of characters is 11',
            min: 'The minimum number of characters is 10'
        },
        dateOfBirth: {
            required: 'Date of birth is required.',
            max: 'The maximum number of characters is 10',
            test: {
                name: 'futureDateValidation',
                message: 'Date of birth cannot be in the future'
            }
        },
        password: {
            required: 'Password is required',
            min: 'The minimum number of characters for the password is 8'
        },
        confirmPassword: {
            required: 'Password is required',
            min: 'The minimum number of characters for the password is 8',
            equals: 'Passwords do not match'
        },
    }
};

export default SignUpConstants;
