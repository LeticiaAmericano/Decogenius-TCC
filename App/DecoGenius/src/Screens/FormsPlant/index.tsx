import React, { useState } from 'react';
import Colors from '../../Constants/Colors.js';
import { Formik } from 'formik';
import Footer from '../../Components/Footer/index.tsx';
import SelectInput from '../../Components/Input/SelectInput/index.tsx';
import MultSelectInput from '../../Components/Input/MultSelectInput/index.tsx';
import { launchImageLibrary } from 'react-native-image-picker';
import questionsData from '../../Constants/json/plantQuestions.json';
import Header from '../../Components/Header/index.tsx';
import Loading from '../../Components/Loading/index.tsx';
import FormInput from '../../Components/Input/FormInput/index.tsx';
import { Container, ContainerBody, DividerLine, FileUploadContainer, ImagePreviewContainer, LabelText, ObservationInputContainer, PreviewImage, ScrollViewInput, SelectInputContainer, UploadButton, UploadButtonText } from './styles.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { plantRequest } from '../../Services/apiService.tsx';
import NavigateConstants from '../../Constants/Navigate.ts';
import { ParamListBase } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import ErrorModal from '../../Components/Modal/ErrorModal/index.tsx';
import { ErrorModalConstants } from '../../Constants/Components/ErrorModal.ts';
import { IErrorModalState } from '../../Interfaces/Components/Modal/IErrorModal.tsx';

const FormsPlant: React.FC = (): JSX.Element => {

    const navigation: NavigationProp<ParamListBase> = useNavigation();

    const [errorModalState, setErrorModalState] = useState<IErrorModalState>({
        visibility: false,
        modalBody: ErrorModalConstants.errorTexts.errorNetworkErrorText,
        modalErrorStackTrace: undefined
    });
    const [loading, setLoading] = useState<boolean>(false);

    const initialValues = {};

    const onCreatePlantSuccess = (response:any) => {
        setLoading(false);
        navigation.navigate(NavigateConstants.Plant3D, response.data);
    }

    const onCreatePlantError = (err) => {
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

    const formatRoomValues = (values) => {
        const rooms = [];
        let roomCount = 1;

        do {
            const room = {
                room_type: values[`loop-Q_01-${roomCount}`].toLowerCase().replace(' ', '_'),
                dimensions: {
                    height: Number(values[`loop-Q_02-${roomCount}`]),
                    width: Number(values[`loop-Q_03-${roomCount}`]),
                    depth: Number(values[`loop-Q_04-${roomCount}`]),
                }
            };
            rooms.push(room);
            roomCount++;
        } while (values[`loop-Q_07-${roomCount - 1}`] === "Sim");

        return { rooms };
    };

    const handleForm = async (values) => {
        const token = await AsyncStorage.getItem('access_token');
        const formattedValues = formatRoomValues(values);
        await plantRequest({ token, ...formattedValues }, onCreatePlantSuccess, onCreatePlantError);
    };

    const updateSelectValue = 
        (key, selectedValue, setFieldValue) => {
            setFieldValue(key, selectedValue);
        };

    const handleFileUpload = (fieldKey, setFieldValue) => {
        const options = {
            selectionLimit: 3,
            mediaType: 'photo',
            includeBase64: false,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('Usuário cancelou a seleção de imagens');
            } else if (response.errorCode) {
                console.log('Erro no ImagePicker: ', response.errorMessage);
            } else {
                const selectedImages = response.assets.map(
                    (asset) => asset.uri
                );
                setFieldValue(fieldKey, selectedImages);
            }
        });
    }

    const chooseComponent = (key, values, type, options, component) => { 
        switch (type) {
            case 'SelectInput':
                return (
                    <SelectInputContainer key={key}>
                        <SelectInput
                            defaultValue={values[key]}
                            label={component.title}
                            textAlign={'center'}
                            options={options.map(
                                (option) => ({
                                    value: option,
                                    label: option,
                                })
                            )}
                            setSelectValue={(selectedValue) => {
                                component.updateSelectValue(key, selectedValue, component.setFieldValue);
                            }}
                            hideIcon={true}
                        />
                    </SelectInputContainer>
                );
            case 'MultSelectInput':
                return (
                    <SelectInputContainer key={key}>
                        <MultSelectInput
                            labelText={component.title}
                            options={options.map(
                                (option) => ({
                                    value: option,
                                    label: option,
                                })
                            )}
                            selectedOptions={values[key] || []}
                            setSelectedOptionsState={(
                                selectedOptions
                            ) =>
                                component.updateSelectValue(
                                    key,
                                    selectedOptions,
                                    component.setFieldValue
                                )
                            }
                        />
                    </SelectInputContainer>
                );
            case 'SimpleInput':
                return (
                    <ObservationInputContainer key={key}>
                        <FormInput
                            labelText={component.title}
                            value={values[key]}
                            onChangeText={(text) =>
                                component.updateSelectValue(key, text, component.setFieldValue)
                            }
                            textColor={Colors.primary}
                            mainColor={Colors.gray[100]}
                            labelColor={Colors.primary}
                            autoCorrect={false}
                        />
                    </ObservationInputContainer>
                );
            case 'file_upload':
                return (
                    <FileUploadContainer key={key}>
                        <LabelText
                            labelColor={Colors.primary}>
                            {component.title}
                        </LabelText>
                        <UploadButton onPress={() => component.handleFileUpload(key, component.setFieldValue)}>
                            <UploadButtonText>Imagem</UploadButtonText>
                        </UploadButton>
                        {values[key] && values[key].length > 0 && (
                            <ImagePreviewContainer>
                                {values[key].map((imageUri, idx) => (
                                    <PreviewImage
                                        key={idx}
                                        source={{ uri: imageUri }}
                                    />
                                ))}
                            </ImagePreviewContainer>
                        )}
                    </FileUploadContainer>
                );
            default:
                return null;
        }
    };

    const ItemRenderMap = ({obj, values, setFieldValue, count}) => {
        return Object.entries(obj).map((item, index) => {
            const [loopKey, loopValue] = item;
            
            if (loopKey === "loop") {
                return <ItemRenderMap 
                        key={`loop-${loopKey}-${count}`}
                        obj={loopValue} 
                        values={values} 
                        setFieldValue={setFieldValue} 
                        count={count + 1} 
                    />;
            }

            const { title, options, loop }: any = loopValue;

            if (loop) {
                if (values[`loop-${loopKey}-${count}`] === "Sim") {
                    return (
                    <>
                        {chooseComponent(`loop-${loopKey}-${count}`, values, options.type, options.options, {
                            title,
                            updateSelectValue,
                            handleFileUpload,
                            setFieldValue
                        })}
                        <DividerLine />
                        <ItemRenderMap 
                            key={`loop-${loopKey}-${count}`}
                            obj={obj} 
                            values={values} 
                            setFieldValue={setFieldValue} 
                            count={count + 1} 
                        />
                    </>);
                }
            }

            return chooseComponent(`loop-${loopKey}-${count}`, values, options.type, options.options, {
                title,
                updateSelectValue,
                handleFileUpload,
                setFieldValue
            });
        });
    }

    if (loading) return <Loading />;

    return (
        <>
            {errorModalState.visibility && (
                    <ErrorModal
                        errorModalState={errorModalState}
                        setErrorModalState={setErrorModalState}
                    />
                )}
            <Formik
                initialValues={initialValues}
                onSubmit={handleForm}
                enableReinitialize={true}
                validateOnChange={false}>
                {({
                    handleSubmit,
                    isSubmitting,
                    setFieldValue,
                    values,
                }:any) => {
                    if (isSubmitting) {
                        return <Loading />;
                    }

                    return (
                        <>
                            <Container>
                                <Header backButton={true} title={'Forms'} />
                                <ContainerBody>
                                    <ScrollViewInput>
                                        <ItemRenderMap obj={questionsData} values={values} setFieldValue={setFieldValue} count={0} />
                                    </ScrollViewInput>
                                </ContainerBody>
                                <Footer
                                    buttonPress={handleSubmit}
                                    textColor={Colors.gray[100]}
                                    backgroundColor={Colors.primary}
                                    title={'Enviar'}
                                />
                            </Container>
                        </>
                    );
                }}
            </Formik>
        </>
    );
};

export default FormsPlant;
