import React from 'react';
import {
    IconsConstants,
    IconSizes,
    IconsTypes
} from '../../../../Libs/ExternalIconsLibrary';
import type { ReactElement } from 'react';
import type { IListItemProps } from '../../../../Interfaces/Components/IMultiInput';
import Colors from '../../../../Constants/Colors';
import Icon from '../../../Icon';
import { IconContainer, ListComponent, ListValue } from './styles';

const ListItem = ({
    item,
    index,
    handleRemoveValue,
    editable,
    textColor
}: IListItemProps): ReactElement => (
    <ListComponent index={index}>
        <ListValue textColor={textColor}>{item}</ListValue>
        {editable && (
            <IconContainer onPress={() => handleRemoveValue(index)}>
                <Icon
                    name={IconsConstants.antDesign.close}
                    iconFamily={IconsTypes.antDesign}
                    size={IconSizes.extraSmall}
                    color={Colors.primary}
                />
            </IconContainer>
        )}
    </ListComponent>
);

export default ListItem;
