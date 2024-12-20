// React
import React from 'react';

// Constants
import {
    IconsConstants,
    IconSizes,
    IconsTypes
} from '../../../../Libs/ExternalIconsLibrary';

// Interfaces
import type { ReactElement } from 'react';
import type { IListItemProps } from '../../../../Interfaces/Components/IMultiInput';

// Components
import Colors from '../../../../Constants/Colors';
import Icon from '../../../Icon';
import { IconContainer, ListComponent, ListValue } from './styles';

const ListItem = ({
    item,
    index,
    handleRemoveValue,
    editable
}: IListItemProps): ReactElement => (
    <ListComponent index={index}>
        <ListValue textColor={Colors.black}>{item}</ListValue>
        {editable && (
            <IconContainer onPress={() => handleRemoveValue(index)}>
                <Icon
                    name={IconsConstants.antDesign.close}
                    iconFamily={IconsTypes.antDesign}
                    size={IconSizes.extraSmall}
                    color={Colors.black}
                />
            </IconContainer>
        )}
    </ListComponent>
);

export default ListItem;
