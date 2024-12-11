import React, { useState } from 'react';
import type { ListRenderItemInfo } from 'react-native';
import { FlatList } from 'react-native';
import Colors from '../../../Constants/Colors';
import type { IMultSelectInputProps } from '../../../Interfaces/Components/IMultiSelectInput';
import type { ISelectOption } from '../../../Interfaces/Components/Input/ISelectInput';
import SelectInput from '../SelectInput';
import ListItem from './ListItem';
import {
    ContainerError,
    ErroText,
    LabelText,
    ListContainer,
    SelectInputContainer
} from './styles';

const MultSelectInput: React.FC<IMultSelectInputProps<string>> = ({
    labelText = '',
    options,
    selectedOptions,
    setSelectedOptionsState,
    editable = true,
    textColor = Colors.primary,
    errorMessages,
}: IMultSelectInputProps<string>) => {
    // Lida com a adição de opções selecionadas
    const handleSelectValue = (value: string): void => {
        const selectedOption = options.find((option) => option.value === value);
        if (selectedOption && !selectedOptions.some((opt) => opt.value === value)) {
            const updatedOptions = [...selectedOptions, selectedOption];
            setSelectedOptionsState(updatedOptions); // Atualiza as opções selecionadas
        }
    };

    // Lida com a remoção de opções
    const handleRemoveOption = (index: number): void => {
        const updatedOptions = selectedOptions.filter((_, i) => i !== index);
        setSelectedOptionsState(updatedOptions); // Atualiza as opções selecionadas
    };

    return (
        <>
            <SelectInputContainer>
                <SelectInput<string>
                    flatBottomBorder={true}
                    options={options}
                    hideIcon={!editable}
                    disabled={!editable}
                    label={labelText}
                    errorMessage={errorMessages?.selectError}
                    setSelectValue={handleSelectValue}
                    styles={{
                        backgroundColor: Colors.gray[200],
                        labelColor: Colors.primary,
                    }}
                />
            </SelectInputContainer>
            <ListContainer>
                <FlatList
                    data={selectedOptions}
                    keyExtractor={(item) => item.value}
                    renderItem={({
                        item,
                        index,
                    }: ListRenderItemInfo<ISelectOption<string>>) => (
                        <ListItem
                            item={item.label}
                            index={index}
                            editable={editable}
                            textColor={textColor}
                            handleRemoveValue={() => handleRemoveOption(index)}
                        />
                    )}
                />
            </ListContainer>
            {errorMessages && (
                <ContainerError>
                    <ErroText>{errorMessages.multError}</ErroText>
                </ContainerError>
            )}
        </>
    );
};

export default MultSelectInput;
