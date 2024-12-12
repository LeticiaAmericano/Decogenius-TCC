import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../Constants/Colors';
import { HeaderConstants } from '../../Constants/Components/Header';
import NavigateConstants from '../../Constants/Navigate';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRightFromBracket, faChevronLeft, faMapLocation } from '@fortawesome/free-solid-svg-icons';
import type IHeader from '../../Interfaces/Components/IHeader';
import { Container, ContainerArrowBack, ContainerLogout, SubHeader, Text } from './styles';
import {logoutRequest} from '../../Services/apiService.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = ({
    hasLogout = false,
    title,
    backButton = true,
    hasPlant = false,
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

    const containerLeftOnPress = async (): Promise<void> => {
        if (hasPlant) navigation.navigate(NavigateConstants.FormsPlant);
        else navigation.goBack();
    };

    return (
        <Container>
            <ContainerArrowBack onPress={containerLeftOnPress}>
                {backButton && (
                    <FontAwesomeIcon icon={faChevronLeft} size={24} color={Colors.gray[100]} />
                )}
                {hasPlant && (
                    <FontAwesomeIcon icon={faMapLocation} size={24} color={Colors.gray[100]} />
                )}
            </ContainerArrowBack>
            <Text>{title ?? HeaderConstants.title}</Text>
            <ContainerLogout onPress={iconLogoutOnPress}>
                {hasLogout && (
                    <FontAwesomeIcon icon={faArrowRightFromBracket} size={24} color={Colors.gray[100]} />
                )}
            </ContainerLogout>
        </Container>
    );
};

export default Header;