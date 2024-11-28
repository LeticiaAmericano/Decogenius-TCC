import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Modal } from 'react-native';
import Icon from '../../Icon';
import SelectOption from './Components/SelectOption';
import Colors from '../../../Constants/Colors';
import { ScreenSizeConstants } from '../../../Constants/Config';
import {
    IconsConstants,
    IconSizes,
    IconsTypes
} from '../../../Libs/ExternalIconsLibrary';
import type { ReactElement } from 'react';
import type {
    ISelectOption,
    ISelectInputProps,
    SelectRenderProps
} from '../../../Interfaces/Components/Input/ISelectInput';
import type { IConfigContext } from '../../../Interfaces/Hooks/Context';
import { findOption } from './Utils';
import { useConfig } from '../../../Hooks/Config';
import {
    ContainerError,
    ErroText,
    LabelText,
    OptionsContainer,
    SelectContainer,
    SelectModalContainer,
    SelectText
} from './styles';

const SelectInput = <TValue,>({
    label,
    setSelectValue,
    defaultValue = undefined,
    labelOption,
    opened = false,
    options = [],
    disabled = false,
    styles = {},
    flatBottomBorder = false,
    textAlign = 'left',
    errorMessage,
    ...rest
}: ISelectInputProps<TValue>): ReactElement => {
    const [toggleDropdown, setToggleDropdown] = useState<boolean>(opened);
    const [selected, setSelected] = useState<ISelectOption<TValue> | undefined>(
        findOption(options, defaultValue)
    );

    const { screenWidth }: IConfigContext = useConfig();

    const toggleSelect: () => void = useCallback(() => {
        if (disabled) return;
        setToggleDropdown(!toggleDropdown);
    }, [disabled, toggleDropdown]);

    const setSelectedValue: (option: ISelectOption<TValue>) => void =
        useCallback(
            (option: ISelectOption<TValue>): void => {
                setToggleDropdown(false);
                setSelected(option);
                setSelectValue(option.value);
            },
            [setSelectValue]
        );

    useEffect(() => {
        if (defaultValue !== null) {
            setSelected(findOption(options, defaultValue));
        }
    }, [defaultValue, options]);

    const labelTextFontSize: number =
        screenWidth <= ScreenSizeConstants.phone.maxSize ? 2.5 : 2;

    return (
        <>
            <Modal
                visible={toggleDropdown}
                transparent={true}
                onRequestClose={toggleSelect}>
                <SelectModalContainer
                    onPress={() => {
                        setToggleDropdown(!toggleDropdown);
                    }}>
                    <OptionsContainer>
                        <FlatList
                            persistentScrollbar={false}
                            data={options}
                            renderItem={({ item }: SelectRenderProps<TValue>) =>
                                SelectOption<TValue>({
                                    option: item,
                                    backgroundColor: styles?.backgroundColor,
                                    handlePress: setSelectedValue
                                })
                            }
                            keyExtractor={(
                                item: ISelectOption<TValue>,
                                index: number
                            ) => index.toString()}
                        />
                    </OptionsContainer>
                </SelectModalContainer>
            </Modal>

            {label && (
                <LabelText
                    labelColor={styles?.labelColor}
                    fontSize={labelTextFontSize}>
                    {label}
                    {rest.required && '*'}
                </LabelText>
            )}
            <SelectContainer
                flatBottomBorder={flatBottomBorder}
                onPress={toggleSelect}
                backgroundColor={styles?.backgroundColor}
                isOpened={toggleDropdown}
                hideIcon={rest.hideIcon}>
                <SelectText
                    labelColor={styles?.optionColor ?? styles?.labelColor}
                    align={textAlign}>
                    {selected?.label ?? labelOption?.label}
                </SelectText>
                {!rest.hideIcon && (
                    <>
                        {toggleDropdown ? (
                            <Icon
                                name={IconsConstants.antDesign.chevronUp}
                                size={IconSizes.extraSmall}
                                iconFamily={IconsTypes.antDesign}
                                color={Colors.black}
                            />
                        ) : (
                            <Icon
                                name={IconsConstants.antDesign.chevronDown}
                                size={IconSizes.extraSmall}
                                iconFamily={IconsTypes.antDesign}
                                color={Colors.black}
                            />
                        )}
                    </>
                )}
            </SelectContainer>
            {errorMessage && (
                <ContainerError>
                    <ErroText>{errorMessage}</ErroText>
                </ContainerError>
            )}
        </>
    );
};

export default SelectInput;
