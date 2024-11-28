// Imports React
import React from 'react';

// Interfaces
import type { ITemplateItem } from '../Interfaces/ITemplateItem';

// Constants
import Colors from '../../../Constants/Colors';

// Styles
import { ContainerItem } from './styles';

const TemplateItem: React.FC<ITemplateItem> = ({
    handlePress,
    handleLongPress,
    children,
    backgroundColor = Colors.blueOcean,
    margin = 10
}: ITemplateItem): JSX.Element => (
    <ContainerItem
        onPress={handlePress}
        onLongPress={handleLongPress}
        backgroundColor={backgroundColor}
        margin={margin}>
        {children}
    </ContainerItem>
);

export default TemplateItem;
