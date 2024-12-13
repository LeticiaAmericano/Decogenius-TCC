const SignInConstants = {
    title: 'Login',
    signInput: {
        values: {
            email: 'email',
            password: 'password',
        },
        labels: {
            email: 'Email:',
            password: 'Senha:',
        }
    },
    signButton: {
        placeholders: {
            login: 'Conectado'
        }
    },
    links: {
        forgetPassword: 'Esqueceu sua senha?',
        createNewUser: 'Não tem uma conta? Cadastre-se'
    },
    errorsMessage: {
        email: {
            valid: 'Digite um email válido',
            required: 'Email é obrigatório'
        },
        password: {
            required: 'Senha é obrigatório',
            min: 'A senha deve ter pelo menos 8 caracteres'
        }
    }
};

export default SignInConstants;
