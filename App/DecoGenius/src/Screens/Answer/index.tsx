import React, { useCallback, useEffect, useState } from 'react';
import {
    BackHandler,
    KeyboardAvoidingView,
    RefreshControl,
} from 'react-native';
import { ErrorModalConstants } from '../../Constants/Components/ErrorModal';
import Header from '../../Components/Header';
import ErrorModal from '../../Components/Modal/ErrorModal';
import type { IErrorModalState } from '../../Interfaces/Components/Modal/IErrorModal';
import {
    Container,
    ContainerAdditionalStyles,
    ContainerBody,
    ImageContainer,
    Images,
    LargeInput,
    SimpleInputContainer,
    ContainerFooter,
} from './styles';
import Loading from '../../Components/Loading';
import Colors from '../../Constants/Colors';
import SimpleInput from '../../Components/Input/SimpleInput';
import {answerRequest} from '../../Services/apiService.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../../Components/Footer/index.tsx';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';


const Answer: React.FC = ({
    route
}): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false);
    const [gptAnswer, setGptAnswer] = useState<any>();

    const setAnswer = async () => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            const design_id  = route.params.design_id;
            const response = await answerRequest({token, design_id});
        
            setGptAnswer(response)
            setLoading(false);
        }
        catch (err) {
            setErrorModalState({
                visibility: true,
                modalBody: ErrorModalConstants.errorTexts.loginNotAuthorizedText,
                modalErrorStackTrace: undefined
            });
            setLoading(false);
        }
    };

    useEffect(() => { 
        setAnswer()
    }, [])
        
    const [errorModalState, setErrorModalState] = useState<IErrorModalState>({
        visibility: false,
        modalBody: ErrorModalConstants.errorTexts.errorNetworkErrorText,
        modalErrorStackTrace: undefined
    });
    const [refreshing, setRefreshing] = useState<boolean>(false);

    useEffect(() => {
        const backHandler: ReturnType<typeof BackHandler.addEventListener> =
            BackHandler.addEventListener('hardwareBackPress', () => false);

        return () => backHandler.remove();
    }, []);

    const onRefresh: () => void = useCallback(() => setRefreshing(true), []);

    const DisplayBase64Image = (base64: string): string => {
        return `data:image/png;base64,${base64}`;
    };

    const navigation: NavigationProp<ParamListBase> = useNavigation();

    const FooterButtonPress: () => void = () =>
        navigation.navigate(
            NavigateConstants.SplashScreen,
        );

    if (loading) return <Loading />;

    return (
        <>
            <KeyboardAvoidingView enabled>
                <Container
                    contentContainerStyle={
                        ContainerAdditionalStyles.contentContainer
                    }
                    nestedScrollEnabled
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }>
                    <Header backButton={true} title={'Design'} />
                    <ContainerBody>
                        <ContainerFooter>
                            <Footer buttonPress={FooterButtonPress} title={"Form Data"} />
                        </ContainerFooter>
                        <SimpleInputContainer>
                            <SimpleInput
                                labelText={'Cômodo:'}
                                value={gptAnswer?.data.name}
                                editable={false}
                                onChangeText={gptAnswer?.data.name}
                                textColor={Colors.primary}
                                mainColor={Colors.gray[200]}
                                labelColor={Colors.gray[200]}
                            />
                        </SimpleInputContainer>
                        <ImageContainer>
                            <Images source={{ uri: DisplayBase64Image(gptAnswer?.data.gpt_photo) }} resizeMode="contain" />
                        </ImageContainer>
                        <LargeInput>{gptAnswer?.data.gpt_description}</LargeInput>
                    </ContainerBody>
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

export default Answer;
