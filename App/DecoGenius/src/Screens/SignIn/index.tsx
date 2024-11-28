import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useState } from 'react';
import Colors from '../../Constants/Colors';
import NavigateConstants from '../../Constants/Navigate';
import PasswordInput from '../../Components/Input/PasswordInput';
import SimpleInput from '../../Components/Input/SimpleInput';
import ErrorModal from '../../Components/Modal/ErrorModal';
import type { IDefaultFormProps } from '../../Interfaces/OutsideComponents/IFormik';
import type { ISignInSendData } from '../../Interfaces/Routes';
import Loading from '../../Components/Loading';
import Footer from '../../Components/Footer';
import { Container, ContentContainer, InputContainer, LinkContainer, LinkText, LoginContainer, SimpleInputContainer, Title } from './styles';
import { ExternalValidationLibrary } from '../../Libs/ExternalValidationLibrary';
import { ErrorModalConstants } from '../../Constants/Components/ErrorModal';
import SignInConstants from '../../Constants/Screens/SignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginRequest} from '../../Services/apiService';

const SignIn: React.FC = (): JSX.Element => {
    const navigation = useNavigation();

    const [errorModalState, setErrorModalState] = useState({
        visibility: false,
        modalBody: ErrorModalConstants.errorTexts.error400Text,
        modalErrorStackTrace: undefined
    });

    const createNewUserHandlePress = (): void => {
        navigation.navigate(NavigateConstants.SignUp);
    };

    const validationSchema = ExternalValidationLibrary.object().shape({
        email: ExternalValidationLibrary.string()
            .label(SignInConstants.signInput.labels.email)
            .email(SignInConstants.errorsMessage.email.valid)
            .required(SignInConstants.errorsMessage.email.required),
        password: ExternalValidationLibrary.string()
            .label(SignInConstants.signInput.labels.password)
            .required(SignInConstants.errorsMessage.password.required)
            .min(8, SignInConstants.errorsMessage.password.min),
    });

    const loginAuthorized = async (response:any) => {
        await AsyncStorage.setItem('access_token', response.data.access_token) 
        navigation.navigate(NavigateConstants.MenuUser); 
    }

    const loginUnauthorized = async (response:any) => {
        setErrorModalState({visibility: true, modalBody: ErrorModalConstants.errorTexts.error401Text, modalErrorStackTrace: undefined})
    }

    const handleLogin = (values:object) => {
        return loginRequest(values, loginAuthorized, loginUnauthorized)
    }

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            onSubmit={handleLogin} 
            validationSchema={validationSchema}
            validateOnChange={false}>
            {({
                handleChange,
                values,
                isSubmitting,
                errors,
                handleSubmit
            }: IDefaultFormProps<ISignInSendData>) => {
                if (isSubmitting) {
                    return <Loading />;
                }
                return (
                    <Container>
                        <LoginContainer>
                            <ContentContainer>
                                <Title>{SignInConstants.title}</Title>
                                <InputContainer>
                                    <SimpleInputContainer width="75%">
                                        <SimpleInput
                                            labelText={SignInConstants.signInput.labels.email}
                                            autoCapitalize="none"
                                            value={values.email}
                                            onChangeText={handleChange('email')}
                                            errorMessage={errors.email}
                                            textColor={Colors.primary}
                                            mainColor={Colors.gray[100]}
                                            labelColor={Colors.gray[100]}
                                            keyboardType="email-address"
                                            autoCorrect={false}
                                        />
                                    </SimpleInputContainer>
                                    <SimpleInputContainer width="75%">
                                        <PasswordInput
                                            labelText={SignInConstants.signInput.labels.password}
                                            value={values.password}
                                            onChangeText={handleChange('password')}
                                            errorMessage={errors.password}
                                            textColor={Colors.primary}
                                            mainColor={Colors.gray[100]}
                                            labelColor={Colors.gray[100]}
                                        />
                                    </SimpleInputContainer>
                                </InputContainer>
                            </ContentContainer>
                            <LinkContainer>
                                <LinkText onPress={createNewUserHandlePress}>
                                    {SignInConstants.links.createNewUser}
                                </LinkText>
                                <LinkText>
                                    {SignInConstants.links.forgetPassword}
                                </LinkText>
                            </LinkContainer>
                        </LoginContainer>
                        <Footer
                            buttonPress={handleSubmit} 
                            backgroundColor={Colors.gray[100]}
                            textColor={Colors.primary}
                            title={SignInConstants.signButton.placeholders.login}
                        />
                        {errorModalState.visibility && (
                            <ErrorModal
                                errorModalState={errorModalState}
                                setErrorModalState={setErrorModalState}
                            />
                        )}
                    </Container>
                );
            }}
        </Formik>
    );
};

export default SignIn;
