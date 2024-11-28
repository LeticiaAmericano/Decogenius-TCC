// Imports React
import type { ReactElement } from 'react';
import React from 'react';

// Components
import TemplateItem from '../TemplateItem';

// Interfaces
import type { IItemWithImage } from '../Interfaces/IItemWithImage';

// Constants
import Colors from '../../../Constants/Colors';

// Styles
import { Image } from './styles';

const ItemWithImage: React.FC<IItemWithImage> = ({
    handlePress,
    handleLongPress,
    imageSource,
    margin
}: IItemWithImage): ReactElement => (
    <TemplateItem
        handleLongPress={handleLongPress}
        handlePress={handlePress}
        backgroundColor={Colors.transparent}
        margin={margin}>
        <Image source={imageSource} resizeMode="cover" />
    </TemplateItem>
);

export default ItemWithImage;
