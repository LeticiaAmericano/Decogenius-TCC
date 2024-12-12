import React, { useCallback, useState } from 'react';
import { Container, ContainerBody, FileUploadContainer, ImagePreviewContainer, LabelText, ObservationInput, ObservationInputContainer, ObservationInputLabel, PreviewImage, ScrollViewInput, SelectInputContainer, UploadButton, UploadButtonText } from './styles.tsx';
import Colors from '../../Constants/Colors.js';
import { Formik } from 'formik';
import Footer from '../../Components/Footer/index.tsx';
import SelectInput from '../../Components/Input/SelectInput/index.tsx';
import MultSelectInput from '../../Components/Input/MultSelectInput/index.tsx';
import { launchImageLibrary } from 'react-native-image-picker';
import questionsData from '../../Constants/json/questions.json';
import hierarchicalData from '../../Constants/json/hierarchical.json';
import Header from '../../Components/Header/index.tsx';
import Loading from '../../Components/Loading/index.tsx';
import FormInput from '../../Components/Input/FormInput/index.tsx';

const Forms: React.FC = (): JSX.Element => {

    const allQuestionKeys = Object.keys(questionsData);
    const consequentQuestionKeys = new Set();

    Object.values(hierarchicalData).forEach((value) => {
        if (typeof value === 'object') {
            Object.values(value).forEach((consequent) => {
                if (Array.isArray(consequent)) {
                    consequent.forEach((qKey) => consequentQuestionKeys.add(qKey));
                } else {
                    consequentQuestionKeys.add(consequent);
                }
            });
        }
    });

    const initialQuestionKeys = allQuestionKeys.filter(
        (key) => !consequentQuestionKeys.has(key)
    );

    const [visibleQuestions, setVisibleQuestions] = useState(initialQuestionKeys);

    const initialValues = {};

    const handleForm = (values) => {};

    function insertAfter(array, item, newItems) {
        const index = array.indexOf(item);
    
        if (index !== -1) {
            const itemsToInsert = Array.isArray(newItems) ? newItems : [newItems];
            array.splice(index + 1, 0, ...itemsToInsert);
        } else {
            console.log("Item não encontrado no array.");
        }
    
        return array;
    }

    return (
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
                const updateSelectValue = 
                    (selectedValue, key) => {
                        let questionAddToRender = visibleQuestions;
                        Object.entries(hierarchicalData).forEach(([keyDependencies, valueDependencies]) => {
                            if (typeof valueDependencies === 'object' && keyDependencies == key) {
                                Object.entries(valueDependencies).forEach(([keyValueDependencies, questionMaybeRender]) => {
                                    if (keyValueDependencies != selectedValue) {
                                        questionAddToRender = questionAddToRender.filter((item) => {
                                            if (Array.isArray(questionMaybeRender)) {
                                                if (questionMaybeRender.includes(item)) setFieldValue(item, undefined)
                                                return !questionMaybeRender.includes(item);
                                            } else {
                                                if (item == questionAddToRender as string) setFieldValue(item, undefined)
                                                return item !== questionMaybeRender;
                                            }
                                        });
                                    } else questionAddToRender = insertAfter(questionAddToRender, key, questionMaybeRender);
                                });
                            }
                        });
                        setVisibleQuestions(questionAddToRender);
                        setFieldValue(key, selectedValue);
                    };

                const handleFileUpload = useCallback(
                    (fieldKey) => {
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
                    },
                    [setFieldValue]
                );

                return (
                    <>
                        <Container>
                            <Header backButton={true} title={'Forms'} />
                            <ContainerBody>
                                <ScrollViewInput>
                                    {visibleQuestions.map((key) => {
                                        const question = questionsData[key];
                                        const { title, options } = question;

                                        switch (options.type) {
                                            case 'SelectInput':
                                                return (
                                                    <SelectInputContainer key={key}>
                                                        <SelectInput
                                                            label={title}
                                                            textAlign={'center'}
                                                            options={options.options.map(
                                                                (option) => ({
                                                                    value: option,
                                                                    label: option,
                                                                })
                                                            )}
                                                            setSelectValue={(selectedValue) => {
                                                                updateSelectValue(selectedValue, key);
                                                            }}
                                                            hideIcon={true}
                                                        />
                                                    </SelectInputContainer>
                                                );
                                            case 'MultSelectInput':
                                                return (
                                                    <SelectInputContainer key={key}>
                                                        <MultSelectInput
                                                            labelText={title}
                                                            options={options.options.map(
                                                                (option) => ({
                                                                    value: option,
                                                                    label: option,
                                                                })
                                                            )}
                                                            selectedOptions={values[key] || []}
                                                            setSelectedOptionsState={(
                                                                selectedOptions
                                                            ) =>
                                                                updateSelectValue(
                                                                    key,
                                                                    selectedOptions
                                                                )
                                                            }
                                                        />
                                                    </SelectInputContainer>
                                                );
                                            case 'SimpleInput':
                                                return (
                                                    <ObservationInputContainer>
                                                        <FormInput
                                                            labelText={title}
                                                            value={values[key]}
                                                            onChangeText={(text) =>
                                                                updateSelectValue(key, text)
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
                                                            {title}
                                                        </LabelText>
                                                        <UploadButton onPress={() => handleFileUpload(key)}>
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
                                    })}
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
    );
};

export default Forms;
