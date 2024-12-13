const SignUpConstants = {
    title: 'Cadastro',
    links: 'Já tem uma conta? Faça login',
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
            name: 'Nome*:',
            email: 'Email*:',
            cpf: 'CPF*:',
            rg: 'RG*:',
            phone: 'Telefone*:',
            dateOfBirth: 'Data de nascimento*:',
            password: 'Senha*:',
            confirmPassword: 'Confirmar senha*:'
        }
    },
    signButton: {
        placeholders: {
            register: 'Cadastrar'
        }
    },
    errorsMessage: {
        name: {
            required: 'Nome é obrigatório'
        },
        email: {
            valid: 'Digite um email válido',
            required: 'Email é obrigatório'
        },
        cpf: {
            required: 'CPF é obrigatório',
            max: 'O CPF deve ter 11 caracteres',
            test: {
                name: 'CpfValidation',
                message: 'Digite um CPF válido'
            }
        },
        phone: {
            required: 'Telefone é obrigatório',
            max: 'O telefone deve ter 11 caracteres',
            min: 'O telefone deve ter 10 caracteres'
        },
        dateOfBirth: {
            required: 'Data de nascimento é obrigatório',
            max: 'A data de nascimento deve ter 10 caracteres',
            test: {
                name: 'futureDateValidation',
                message: 'A data de nascimento não pode ser no futuro'
            }
        },
        password: {
            required: 'Senha é obrigatório',
            min: 'A senha deve ter pelo menos 8 caracteres'
        },
        confirmPassword: {
            required: 'Senha é obrigatório',
            min: 'A senha deve ter pelo menos 8 caracteres',
            equals: 'As senhas não correspondem'
        },
    }
};

export default SignUpConstants;
