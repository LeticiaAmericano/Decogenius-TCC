import React from 'react';
import { View } from 'react-native';
import Colors from '../../../../Constants/Colors';
import { PhotoModalConstants } from '../../../../Constants/Components/PhotoModal';
import type { IMenuProps } from '../../../../Interfaces/Components/Modal/IPhotoModal';
import {
    IconSizes,
    IconsConstants,
    IconsTypes
} from '../../../../Libs/ExternalIconsLibrary';
import Icon from '../../../Icon';
import {
    Divider,
    MenuContainer,
    MenuOption,
    MenuOptionText,
    MenuTrigger
} from './styles';

export const Menu: React.FC<IMenuProps> = ({
    shareOptionPress,
    deleteOptionPress,
    open,
    setOpen
}: IMenuProps): React.ReactElement => (
    <View>
        <MenuTrigger onPress={() => setOpen(!open)}>
            <Icon
                color={Colors.white}
                name={IconsConstants.materialCommunityIcons.dotsVertical}
                iconFamily={IconsTypes.materialCommunityIcons}
                size={IconSizes.small}
            />
        </MenuTrigger>
        {open && (
            <MenuContainer>
                <MenuOption onPress={shareOptionPress}>
                    <Icon
                        color={Colors.blueOcean}
                        name={IconsConstants.simpleLineIcons.share}
                        iconFamily={IconsTypes.simpleLineIcons}
                        size={IconSizes.extraSmall}
                    />
                    <MenuOptionText>{PhotoModalConstants.share}</MenuOptionText>
                </MenuOption>
                <Divider />
                <MenuOption onPress={deleteOptionPress}>
                    <Icon
                        color={Colors.blueOcean}
                        name={IconsConstants.fontisto.trash}
                        iconFamily={IconsTypes.fontisto}
                        size={IconSizes.extraSmall}
                    />
                    <MenuOptionText>
                        {PhotoModalConstants.delete}
                    </MenuOptionText>
                </MenuOption>
            </MenuContainer>
        )}
    </View>
);
