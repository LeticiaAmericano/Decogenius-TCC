import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
    BackHandler,
    KeyboardAvoidingView,
    RefreshControl
} from 'react-native';
import { ErrorModalConstants } from '../../Constants/Components/ErrorModal';
import NavigateConstants from '../../Constants/Navigate';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import ItemList from '../../Components/ItemList';
import ErrorModal from '../../Components/Modal/ErrorModal';
import SearchInput from './Components/SearchInput';
import type { IErrorModalState } from '../../Interfaces/Components/Modal/IErrorModal';
import {listRequest} from '../../Services/apiService.tsx';
import {
    Container,
    ContainerAdditionalStyles,
    ContainerBody,
    ContainerItemList,
    ContainerTitle,
    Text,
} from './styles';
import Loading from '../../Components/Loading';
import MenuUserConstants from '../../Constants/Screens/MenuUser';
import { IRoom } from '../../Interfaces/Entities/IRooms';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MenuUser: React.FC = (): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(true);
    const [searchBarValue, setSearchBarValue] = useState<string>('');
    const [roomsData, setRoomsData] = useState<IRoom[]>([]);
    const [roomsDataFilter, setRoomsDataFilter] = useState<IRoom[]>([]);
 

    useEffect(()=> {
        const setList = async () => {
            try {
                const token = await AsyncStorage.getItem('access_token');
                const response = await listRequest({token});
                setRoomsData(response.data.designs);
                setRoomsDataFilter(response.data.designs);
                setLoading(false);
            }
            catch (err) {
                setLoading(false);
                if (err.response.status === 404) {
                    return;
                }
                setErrorModalState({
                    visibility: true,
                    modalBody: ErrorModalConstants.errorTexts.loginNotAuthorizedText,
                    modalErrorStackTrace: undefined
                });   
            }
        };

        setList();
    }, []);
        
    const [errorModalState, setErrorModalState] = useState<IErrorModalState>({
        visibility: false,
        modalBody: ErrorModalConstants.errorTexts.errorNetworkErrorText,
        modalErrorStackTrace: undefined
    });
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const navigation: NavigationProp<ParamListBase> = useNavigation();

    useEffect(() => {
        const backHandler: ReturnType<typeof BackHandler.addEventListener> =
            BackHandler.addEventListener('hardwareBackPress', () => false);

        return () => backHandler.remove();
    }, []);

    const onRefresh: () => void = useCallback(async () => {
        setRefreshing(true);
        const token = await AsyncStorage.getItem('access_token');
        const response = await listRequest({token});
        setRoomsData(response.data.designs);
        setRoomsDataFilter(response.data.designs);
        setRefreshing(false);
    }, []);

    const OnUpdateSearchBar = (newValue: string) => {
        setSearchBarValue(newValue);
        const filteredRooms = roomsData.filter((room: IRoom) =>
            room.name.toLowerCase().includes(newValue.toLowerCase())
        );
        setRoomsDataFilter(filteredRooms);
    };

    const FooterButtonPress: () => void = () =>
        navigation.navigate(
            NavigateConstants.Forms,
        );

    if (loading) return <Loading />;
    return (
        <>
            <KeyboardAvoidingView enabled>
                <Container
                    contentContainerStyle={ContainerAdditionalStyles.contentContainer}
                    nestedScrollEnabled
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    <Header hasLogout backButton={false} />
                    <ContainerBody>
                        <ContainerTitle>
                            <Text>{MenuUserConstants.itemList.title}</Text>
                        </ContainerTitle>
                        <SearchInput
                            value={searchBarValue}
                            onUpdate={OnUpdateSearchBar}
                        />
                        <ContainerItemList>
                            <ItemList
                                data={roomsDataFilter}
                                navigationScreen={NavigateConstants.Answer}
                            />
                        </ContainerItemList>
                    </ContainerBody>
                    <Footer buttonPress={FooterButtonPress} title={"Novo cômodo"} />
                </Container>
            </KeyboardAvoidingView>
            {errorModalState.visibility && (
                <ErrorModal
                    errorModalState={errorModalState}
                    setErrorModalState={setErrorModalState}
                />
            )}
        </>
    );
};

export default MenuUser;
