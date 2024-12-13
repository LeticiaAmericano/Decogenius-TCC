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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleChevronLeft, faClose } from '@fortawesome/free-solid-svg-icons';

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
                <FontAwesomeIcon icon={faClose} size={24} color={Colors.primary} />
            </IconContainer>
        )}
    </ListComponent>
);

export default ListItem;
