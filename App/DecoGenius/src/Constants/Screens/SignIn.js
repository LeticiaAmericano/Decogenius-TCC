const SignInConstants = {
    title: 'Sign In',
    signInput: {
        values: {
            email: 'email',
            password: 'password',
        },
        labels: {
            email: 'Email:',
            password: 'Password:',
        }
    },
    signButton: {
        placeholders: {
            login: 'Connected'
        }
    },
    links: {
        forgetPassword: 'Forgot your password?',
        createNewUser: 'Don\'t have a user? Register'
    },
    errorsMessage: {
        email: {
            valid: 'Enter a valid email',
            required: 'Email is mandatory'
        },
        password: {
            required: 'Password is mandatory',
            min: 'The minimum number of characters for the password is 8'
        }
    }
};

export default SignInConstants;
