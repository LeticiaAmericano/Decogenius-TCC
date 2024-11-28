import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import Footer from '../../Components/Footer';
import PasswordInput from '../../Components/Input/PasswordInput';
import SimpleInput from '../../Components/Input/SimpleInput';
import Loading from '../../Components/Loading';
import ErrorModal from '../../Components/Modal/ErrorModal';
import type { IErrorModalState } from '../../Interfaces/Components/Modal/IErrorModal';
import type { ISignUpPayload } from '../../Interfaces/Routes';
import type {
    ISignUpForm,
} from '../../Interfaces/Screens/ISignUp';
import Colors from '../../Constants/Colors';
import { ErrorModalConstants } from '../../Constants/Components/ErrorModal';
import NavigateConstants from '../../Constants/Navigate';
import { mask } from '../../Utils/FormattingDataFunctions';
import {
    cpfValidationFC,
    validateFutureDateOfBirth
} from '../../Utils/Validations';
import { useConfig } from '../../Hooks/Config';
import type {
    IConfigContext
} from '../../Interfaces/Hooks/Context';
import Icon from '../../Components/Icon';
import { IconsConstants, IconsTypes } from '../../Libs/ExternalIconsLibrary';
import {
    BodyContainer,
    HeaderContainer,
    IconPressable,
    InputArea,
    LinkText,
    SimpleInputContainer,
    Title,
} from './styles';
import { ExternalValidationLibrary } from '../../Libs/ExternalValidationLibrary.ts';
import SignUpConstants from '../../Constants/Screens/SignUp.js';
import { ExternalValidationFieldReference } from '../../Libs/ExternalValidationLibrary/Types/ExternalValidationLibraryTypes.ts';
import { ScrollView } from 'react-native';
import {registerRequest} from '../../Services/apiService.tsx';

const SignUp: React.FC = () => {
    const { screenWidth }: IConfigContext = useConfig();
    const [loading, setLoading] = useState<boolean>(false);
    const [errorModalState, setErrorModalState] = useState<IErrorModalState>({
        visibility: false,
        modalBody: ErrorModalConstants.errorTexts.errorNetworkErrorText,
        modalErrorStackTrace: undefined
    });

    const navigation = useNavigation();

    const createNewUserHandlePress = (): void => {
        navigation.goBack();
    };

    const registerAuthorized = async (response:any) => {
        navigation.navigate(NavigateConstants.SignIn); 
    }

    const registerUnauthorized = async (response:any) => {
        setErrorModalState({visibility: true, modalBody: ErrorModalConstants.errorTexts.error401Text, modalErrorStackTrace: undefined})
    }

    const handleRegister = (values:any) => {
        const params = {...values, birth_date:values.dateOfBirth}
        return registerRequest(params, registerAuthorized, registerUnauthorized)
    }

    const validationSchema = ExternalValidationLibrary.object().shape({
        name: ExternalValidationLibrary.string()
            .label(SignUpConstants.signInput.labels.name)
            .required(SignUpConstants.errorsMessage.name.required),

        email: ExternalValidationLibrary.string()
            .label(SignUpConstants.signInput.labels.email)
            .email(SignUpConstants.errorsMessage.email.valid)
            .required(SignUpConstants.errorsMessage.email.required),

        cpf: ExternalValidationLibrary.string()
            .label(SignUpConstants.signInput.labels.cpf)
            .required(SignUpConstants.errorsMessage.cpf.required)
            .max(14, SignUpConstants.errorsMessage.cpf.max)
            .test(
                SignUpConstants.errorsMessage.cpf.test.name,
                SignUpConstants.errorsMessage.cpf.test.message,
                cpfValidationFC
            ),

        phone: ExternalValidationLibrary.string()
            .label(SignUpConstants.signInput.labels.phone)
            .required(SignUpConstants.errorsMessage.phone.required)
            .min(15, SignUpConstants.errorsMessage.phone.min)
            .max(16, SignUpConstants.errorsMessage.phone.max),

        dateOfBirth: ExternalValidationLibrary.string()
            .label(SignUpConstants.signInput.labels.dateOfBirth)
            .required(SignUpConstants.errorsMessage.dateOfBirth.required)
            .max(10, SignUpConstants.errorsMessage.dateOfBirth.max)
            .test(
                SignUpConstants.errorsMessage.dateOfBirth.test.name,
                SignUpConstants.errorsMessage.dateOfBirth.test.message,
                validateFutureDateOfBirth
            ),

        password: ExternalValidationLibrary.string()
            .label(SignUpConstants.signInput.labels.password)
            .required(SignUpConstants.errorsMessage.password.required)
            .min(8, SignUpConstants.errorsMessage.password.min),

        confirmPassword: ExternalValidationLibrary.string()
            .label(SignUpConstants.signInput.labels.confirmPassword)
            .required(SignUpConstants.errorsMessage.confirmPassword.required)
            .min(8, SignUpConstants.errorsMessage.confirmPassword.min)
            .equals<ExternalValidationFieldReference>(
                [
                    ExternalValidationLibrary.ref(
                        SignUpConstants.signInput.values.password
                    )
                ],
                SignUpConstants.errorsMessage.confirmPassword.equals
            ),

    });

    if (loading) return <Loading />;
    return (
        <>
            <HeaderContainer>
                <IconPressable onPress={() => navigation.goBack()}>
                    <Icon
                        name={IconsConstants.fontAwesome.arrowLeft}
                        iconFamily={IconsTypes.fontAwesome}
                        color={Colors.gray[100]}
                    />
                </IconPressable>
                <Title>{SignUpConstants.title}</Title>
            </HeaderContainer>
            <BodyContainer>
                <Formik<ISignUpPayload>
                    initialValues={{
                        name: '',
                        cpf: '',
                        phone: '',
                        dateOfBirth: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    onSubmit={handleRegister}
                    validationSchema={validationSchema}
                    validateOnChange={false}>
                    {({
                        handleChange,
                        values,
                        handleSubmit,
                        errors,
                    }: ISignUpForm) => (
                        <>
                             <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                                <InputArea>
            
                                    <SimpleInputContainer paddingTop={0}>
                                        <SimpleInput
                                            labelText={SignUpConstants.signInput.labels.name}
                                            value={values.name ?? ''}
                                            onChangeText={handleChange(
                                                SignUpConstants.signInput.values.name
                                            )}
                                            errorMessage={errors.name}
                                            textColor={Colors.primary}
                                            mainColor={Colors.gray[100]}
                                            labelColor={Colors.gray[100]}
                                        />
                                    </SimpleInputContainer>
                                    <SimpleInputContainer>
                                        <SimpleInput
                                            labelText={SignUpConstants.signInput.labels.cpf}
                                            value={mask.cpf(values.cpf)}
                                            onChangeText={handleChange(
                                                SignUpConstants.signInput.values.cpf
                                            )}
                                            errorMessage={errors.cpf}
                                            keyboardType="numeric"
                                            textColor={Colors.primary}
                                            mainColor={Colors.gray[100]}
                                            labelColor={Colors.gray[100]}
                                        />
                                    </SimpleInputContainer>
                                    <SimpleInputContainer>
                                        <SimpleInput
                                            labelText={SignUpConstants.signInput.labels.phone}
                                            value={mask.phoneNumber(values.phone)}
                                            errorMessage={errors.phone}
                                            keyboardType="numeric"
                                            textColor={Colors.primary}
                                            mainColor={Colors.gray[100]}
                                            labelColor={Colors.gray[100]}
                                            onChangeText={handleChange(
                                                SignUpConstants.signInput.values.phone
                                            )}
                                        />
                                    </SimpleInputContainer>
                                    <SimpleInputContainer>
                                        <SimpleInput
                                            labelText={SignUpConstants.signInput.labels.dateOfBirth}
                                            autoCapitalize="none"
                                            value={mask.date(values.dateOfBirth)}
                                            onChangeText={handleChange(
                                                SignUpConstants.signInput.values.dateOfBirth
                                            )}
                                            errorMessage={errors.dateOfBirth}
                                            textColor={Colors.primary}
                                            mainColor={Colors.gray[100]}
                                            labelColor={Colors.gray[100]}
                                            keyboardType="numeric"
                                            autoCorrect={false}
                                        />
                                    </SimpleInputContainer>
                                    <SimpleInputContainer>
                                        <SimpleInput
                                            labelText={SignUpConstants.signInput.labels.email}
                                            autoCapitalize="none"
                                            value={values.email}
                                            onChangeText={handleChange(
                                                SignUpConstants.signInput.values.email
                                            )}
                                            errorMessage={errors.email}
                                            textColor={Colors.primary}
                                            mainColor={Colors.gray[100]}
                                            labelColor={Colors.gray[100]}
                                            keyboardType="email-address"
                                            autoCorrect={false}
                                        />
                                    </SimpleInputContainer>
                                    <SimpleInputContainer>
                                        <PasswordInput
                                            labelText={SignUpConstants.signInput.labels.password}
                                            value={values.password}
                                            onChangeText={handleChange(
                                                SignUpConstants.signInput.values.password
                                            )}
                                            errorMessage={errors.password}
                                            textColor={Colors.primary}
                                            mainColor={Colors.gray[100]}
                                            labelColor={Colors.gray[100]}
                                        />
                                    </SimpleInputContainer>
                                    <SimpleInputContainer>
                                        <PasswordInput
                                            labelText={SignUpConstants.signInput.labels.confirmPassword}
                                            value={values.confirmPassword}
                                            onChangeText={handleChange(
                                                SignUpConstants.signInput.values.confirmPassword
                                            )}
                                            errorMessage={errors.confirmPassword}
                                            textColor={Colors.primary}
                                            mainColor={Colors.gray[100]}
                                            labelColor={Colors.gray[100]}
                                        />
                                    </SimpleInputContainer>
                                </InputArea>
                            </ScrollView>
                            
                            <LinkText
                                    onPress={createNewUserHandlePress}>
                                    {SignUpConstants.links}
                            </LinkText>

                            <Footer
                                buttonPress={handleSubmit}
                                textColor={Colors.primary}
                                backgroundColor={Colors.gray[100]}
                                title={
                                    SignUpConstants.signButton.placeholders.register
                                }
                            />
                            
                        </>
                    )}
                    
                </Formik>
            </BodyContainer>
            {errorModalState.visibility && (
                <ErrorModal
                    errorModalState={errorModalState}
                    setErrorModalState={setErrorModalState}
                />
            )}
        </>
    );
};

export default SignUp;
