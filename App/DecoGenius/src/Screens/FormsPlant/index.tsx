import React, { useCallback, useState } from 'react';
import { Container, ScrollViewInput, SelectInputContainer } from './styles.tsx';
import Colors from '../../Constants/Colors.js';
import { Formik } from 'formik';
import Footer from '../../Components/Footer/index.tsx';
import SelectInput from '../../Components/Input/SelectInput/index.tsx';
import MultSelectInput from '../../Components/Input/MultSelectInput/index.tsx';
import SimpleInput from '../../Components/Input/SimpleInput/index.tsx';
import { launchImageLibrary } from 'react-native-image-picker';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import questions from '../../Constants/json/plantQuestions.json';

const Forms: React.FC = (): JSX.Element => {

    const allQuestionKeys = Object.keys(questions);

    const initialValues = {};

    const handleForm = (values) => {};

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleForm}
            enableReinitialize={true}
            validateOnChange={false}
        >
            {({ handleSubmit, values, setFieldValue }) => {
                const updateSelectValue = 
                    (selectedValue, key) => {
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
                            <ScrollViewInput>
                                {allQuestionKeys.map((key) => {
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
                                                <SelectInputContainer key={key}>
                                                    <SimpleInput
                                                        labelText={title}
                                                        value={values[key] || ''}
                                                        onChangeText={(text) =>
                                                            updateSelectValue(key, text)
                                                        }
                                                        textColor={Colors.primary}
                                                        mainColor={Colors.gray[100]}
                                                        labelColor={Colors.gray[100]}
                                                    />
                                                </SelectInputContainer>
                                            );
                                        case 'file_upload':
                                            return (
                                                <SelectInputContainer key={key}>
                                                    <TouchableOpacity
                                                        onPress={() => handleFileUpload(key)}
                                                    >
                                                        <Text>{title}</Text>
                                                    </TouchableOpacity>
                                                    {values[key] &&
                                                        values[key].length > 0 && (
                                                            <View>
                                                                {values[key].map(
                                                                    (imageUri, idx) => (
                                                                        <Image
                                                                            key={idx}
                                                                            source={{
                                                                                uri: imageUri,
                                                                            }}
                                                                            style={{
                                                                                width: 100,
                                                                                height: 100,
                                                                            }}
                                                                        />
                                                                    )
                                                                )}
                                                            </View>
                                                        )}
                                                </SelectInputContainer>
                                            );
                                        default:
                                            return null;
                                    }
                                })}
                            </ScrollViewInput>
                        </Container>
                        <Footer
                            buttonPress={handleSubmit}
                            textColor={Colors.gray[100]}
                            backgroundColor={Colors.primary}
                            title={'Confirmar'}
                        />
                    </>
                );
            }}
        </Formik>
    );
};

export default Forms;
