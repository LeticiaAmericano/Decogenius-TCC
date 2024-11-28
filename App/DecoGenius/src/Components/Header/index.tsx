import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../Constants/Colors';
import { HeaderConstants } from '../../Constants/Components/Header';
import NavigateConstants from '../../Constants/Navigate';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoffee, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import type IHeader from '../../Interfaces/Components/IHeader';
import { Container, ContainerArrowBack, ContainerLogout, SubHeader, Text } from './styles';
import {logoutRequest} from '../../Services/apiService.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ErrorModalConstants } from '../../Constants/Components/ErrorModal.ts';

const Header = ({
    hasLogout = false,
    title,
    backButton = true,
    goBackFunction
}: IHeader): JSX.Element => {
    const navigation = useNavigation();

    const iconLogoutOnPress = async (): Promise<void> => {
        const token = await AsyncStorage.getItem('access_token');
        logoutRequest({token}, logoutAuthorized)
    };

    const logoutAuthorized = async (response:any) => {
        navigation.navigate(NavigateConstants.SignIn); 
    }

    const arrowBackOnPress = async (): Promise<void> => {
        if (goBackFunction) {
            goBackFunction instanceof Promise
                ? await goBackFunction()
                : goBackFunction();
        }
        navigation.goBack();
    };

    return (
        <Container>
            <ContainerArrowBack onPress={arrowBackOnPress}>
                {backButton && (
                    <FontAwesomeIcon icon={faArrowLeft} size={24} color={Colors.gray[100]} />
                )}
            </ContainerArrowBack>
            <Text>{title ?? HeaderConstants.title}</Text>
            <ContainerLogout onPress={iconLogoutOnPress}>
                {hasLogout && <SubHeader>Log out</SubHeader>}
            </ContainerLogout>
        </Container>
    );
};

export default Header;