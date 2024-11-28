import React, { useState } from 'react';
import type { ListRenderItemInfo } from 'react-native';
import { FlatList } from 'react-native';
import Colors from '../../../Constants/Colors';
import type { IMultSelectInputProps } from '../../../Interfaces/Components/IMultiSelectInput';
import type { ISelectOption } from '../../../Interfaces/Components/Input/ISelectInput';
import MultiInput from '../MultiInput/MultiInput';
import SelectInput from '../SelectInput';
import ListItem from './ListItem';
import {
    ContainerError,
    ErroText,
    LabelText,
    ListContainer,
    MultiInputContainer,
    SelectInputContainer
} from './styles';
import { useConfig } from '../../../Hooks/Config';
import type { IConfigContext } from '../../../Interfaces/Hooks/Context';
import { ScreenSizeConstants } from '../../../Constants/Config';
import { findOption } from '../SelectInput/Utils';

const MultSelectInput: React.FC<IMultSelectInputProps<string>> = ({
    labelText = '',
    options,
    setSelectedOptionsState,
    otherOptionInputValues,
    setOtherOptionInputValues,
    editable,
    externalSelectOptionHandler,
    textColor = Colors.black,
    errorMessages,
    isView = false,
    ...props
}: IMultSelectInputProps<string>) => {
    const [selectedOptions, setSelectedOptions] = useState<
        ISelectOption<string>[]
    >(props.selectedOptions);
    const [toggleInput, setToggleInput] = useState<boolean>(
        props.selectedOptions.length > 0 &&
            Boolean(findOption(props.selectedOptions, 'others'))
    );
    const { screenWidth }: IConfigContext = useConfig();
    const labelTextFontSize: number =
        screenWidth <= ScreenSizeConstants.phone.maxSize ? 2.5 : 2;

    const handleSelectValue: (value?: string) => void = (
        value: string | undefined
    ): void => {
        const selectedOption: ISelectOption<string> | undefined = options.find(
            (option: ISelectOption<string>) => option.value === value
        );
        if (selectedOption) {
            if (value === 'others') {
                setToggleInput(true);
            }
            let data: ISelectOption<string>[] = [];

            const alreadyHasValue =
                selectedOptions &&
                selectedOptions.some(
                    (option: ISelectOption<string>) =>
                        option.value === selectedOption.value
                );
            if (alreadyHasValue) return;
            data = [...selectedOptions, selectedOption];
            setSelectedOptions(data);
            setSelectedOptionsState(data);

            externalSelectOptionHandler?.(data);
        }
    };

    const handleRemoveOption: (index: number) => void = (
        index: number
    ): void => {
        const selectedOption: ISelectOption<string> = selectedOptions[index];
        if (selectedOption.value === 'others') {
            setToggleInput(false);
        }
        const newOptions: ISelectOption<string>[] = selectedOptions.filter(
            (_: ISelectOption<string>, i: number) => i !== index
        );
        setSelectedOptions(newOptions);
    };

    return (
        <>
            {isView ? (
                <LabelText fontSize={labelTextFontSize}>{labelText}</LabelText>
            ) : (
                <SelectInputContainer height={props.height}>
                    <SelectInput<string>
                        flatBottomBorder={true}
                        options={options}
                        hideIcon={!editable}
                        disabled={!editable}
                        label={labelText}
                        errorMessage={errorMessages?.selectError}
                        setSelectValue={handleSelectValue}
                        styles={{
                            backgroundColor: props.mainColor,
                            labelColor: props.labelColor,
                            isOpened: toggleInput
                        }}
                    />
                </SelectInputContainer>
            )}
            <ListContainer>
                <FlatList
                    data={selectedOptions}
                    keyExtractor={(_: ISelectOption<string>, index: number) =>
                        index.toString()
                    }
                    renderItem={({
                        item,
                        index
                    }: ListRenderItemInfo<ISelectOption<string>>) => (
                        <ListItem
                            item={item.label}
                            index={index}
                            editable={editable}
                            textColor={textColor}
                            handleRemoveValue={handleRemoveOption}
                        />
                    )}
                />
            </ListContainer>
            {(toggleInput || isView) && (
                <MultiInputContainer>
                    <MultiInput
                        values={otherOptionInputValues}
                        setValues={setOtherOptionInputValues}
                        mainColor={props.mainColor}
                        editable={editable}
                    />
                </MultiInputContainer>
            )}
            {errorMessages && (
                <ContainerError>
                    <ErroText>{errorMessages.multError}</ErroText>
                </ContainerError>
            )}
        </>
    );
};

export default MultSelectInput;
