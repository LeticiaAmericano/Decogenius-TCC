import React from 'react';

// Styles
import { SelectOptionContainer, SelectOptionText } from './styles';

// Interfaces
import type { IRenderSelectOption } from '../../../../../Interfaces/Components/Input/ISelectInput';

function SelectOption<TValue>({
    option,
    backgroundColor,
    handlePress
}: IRenderSelectOption<TValue>): JSX.Element {
    return (
        <SelectOptionContainer
            backgroundColor={backgroundColor}
            onPress={() => {
                handlePress(option);
            }}>
            <SelectOptionText>{option.label}</SelectOptionText>
        </SelectOptionContainer>
    );
}

export default SelectOption;
