import type { ReactElement } from 'react';
import React, { useCallback, useState } from 'react';
import type { ListRenderItemInfo } from 'react-native';
import { FlatList } from 'react-native';
import Colors from '../../../Constants/Colors';
import type { IMultiInputProps } from '../../../Interfaces/Components/IMultiInput';
import { IconsConstants } from '../../../Libs/ExternalIconsLibrary';
import SimpleInput from '../SimpleInput';
import ListItem from './ListItem';
import { ListContainer, SimpleInputContainer } from './styles';

const MultiInput = ({
    values,
    setValues,
    editable = true,
    textColor = Colors.black,
    mainColor = Colors.white,
    ...rest
}: Readonly<IMultiInputProps>): ReactElement => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleAddValue = useCallback((): void => {
        if (inputValue) {
            setValues([inputValue, ...values]);
            setInputValue('');
        }
    }, [inputValue, setValues, values]);

    const handleChangeText = (value: string): void => {
        setInputValue(value);
    };

    const handleRemoveValue = useCallback(
        (index: number): void => {
            const updatedValues = [...values];
            updatedValues.splice(index, 1);
            setValues(updatedValues);
        },
        [setValues, values]
    );

    return (
        <>
            {editable && (
                <SimpleInputContainer>
                    <SimpleInput
                        {...rest}
                        straightBottomBorderRadius={values.length > 0}
                        iconName={
                            editable
                                ? IconsConstants.fontAwesome.plus
                                : undefined
                        }
                        onIconPress={handleAddValue}
                        onChangeText={handleChangeText}
                        value={inputValue}
                        textColor={textColor}
                        mainColor={mainColor}
                    />
                </SimpleInputContainer>
            )}

            <ListContainer backgroundColor={mainColor}>
                <FlatList
                    data={values}
                    keyExtractor={(_: string, index: number) =>
                        index.toString()
                    }
                    renderItem={({
                        item,
                        index
                    }: ListRenderItemInfo<string>) => (
                        <ListItem
                            item={item}
                            index={index}
                            editable={editable}
                            textColor={textColor}
                            handleRemoveValue={handleRemoveValue}
                        />
                    )}
                />
            </ListContainer>
        </>
    );
};

export default MultiInput;
