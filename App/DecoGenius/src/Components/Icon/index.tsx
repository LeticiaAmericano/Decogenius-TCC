import React from 'react';

import { IconComponent } from './styles';
import { IIcon } from '../../Interfaces/Components/IIcon';
import { iconFontSizes, iconMap, IconSizes } from '../../Libs/ExternalIconsLibrary';

const Icon: React.FC<IIcon> = ({
    iconFamily,
    name,
    size = IconSizes.small
}: IIcon) => {
    const icon = iconMap[iconFamily];

    if (!icon) {
        return null;
    }

    const getIconFontSize = (fontSize: string): number =>
        iconFontSizes[fontSize] || iconFontSizes.default;

    const iconFontSize = getIconFontSize(size);
    return (
        <IconComponent
            as={icon}
            name={name}
            iconFontSize={iconFontSize}
        />
    );
};

export default Icon;
