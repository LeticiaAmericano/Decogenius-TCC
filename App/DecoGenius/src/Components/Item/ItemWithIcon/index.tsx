// Imports React
import type { ReactElement } from 'react';
import React from 'react';

// Components
import Icon from '../../Icon';

// Interfaces
import type { IItemWithIcon } from '../Interfaces/IItemWithIcon';

// Constants
import Colors from '../../../Constants/Colors';
import { IconSizes } from '../../../Libs/ExternalIconsLibrary';

// Components
import TemplateItem from '../TemplateItem';

// Styles
import { ContainerIcon, TextItem } from './styles';

const ItemWithIcon: React.FC<IItemWithIcon> = ({
    handlePress,
    labelText,
    icon,
    backgroundColor,
    margin
}: IItemWithIcon): ReactElement => (
    <TemplateItem
        handlePress={handlePress}
        backgroundColor={backgroundColor}
        margin={margin}>
        <ContainerIcon>
            <Icon
                iconFamily={icon.iconFamily}
                name={icon.iconName}
                color={Colors.white}
                size={labelText != null ? IconSizes.small : IconSizes.large}
            />
        </ContainerIcon>
        {labelText != null && (
            <TextItem numberOfLines={2}>{labelText}</TextItem>
        )}
    </TemplateItem>
);

export default ItemWithIcon;
