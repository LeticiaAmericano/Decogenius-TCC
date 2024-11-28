import type { FC, ReactElement } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import Colors from '../../../Constants/Colors';
import type { IPhotoModalProps } from '../../../Interfaces/Components/Modal/IPhotoModal';
import {
    IconsConstants,
    IconSizes,
    IconsTypes
} from '../../../Libs/ExternalIconsLibrary';
import { ExternalShareLibrary } from '../../../Libs/ExternalShareLibrary';
import { imageService } from '../../../Services/ImageService';
import Icon from '../../Icon';
import { Menu } from './components/Menu';
import {
    BackgroundImageContainer,
    IconsContainer,
    ModalContainer,
    ModalInnerContainer,
    TouchableIconContainer
} from './styles';

const PhotoModal: FC<IPhotoModalProps> = ({
    visible,
    setVisible,
    images,
    currentIndex,
    showDelete
}: IPhotoModalProps): ReactElement | null => {
    const [currentIndexState, setCurrentIndexState] =
        useState<number>(currentIndex);
    const [optionsOpen, setOptionsOpen] = useState<boolean>(false);
    const isNotLastPage = currentIndexState < images.length - 1;

    const closeOptionsMenu = useCallback((): void => {
        showDelete && setOptionsOpen(false);
    }, [showDelete]);

    const handleCloseModal = useCallback((): void => {
        closeOptionsMenu();
        setVisible(!visible);
        setCurrentIndexState(currentIndex);
    }, [closeOptionsMenu, currentIndex, setVisible, visible]);

    const navigateLeft = useCallback((): void => {
        if (currentIndexState > 0) setCurrentIndexState(currentIndexState - 1);
        closeOptionsMenu();
    }, [closeOptionsMenu, currentIndexState]);

    const navigateRight = useCallback((): void => {
        if (isNotLastPage) setCurrentIndexState(currentIndexState + 1);
        closeOptionsMenu();
    }, [isNotLastPage, closeOptionsMenu, currentIndexState]);

    const currentImage: string = images[currentIndexState];

    const shareOptionPress = async (): Promise<void> => {
        await ExternalShareLibrary.open({
            url: images[currentIndexState],
            failOnCancel: false
        });
    };

    const deleteOptionPress = async (): Promise<void> => {
        await imageService.deleteImage(images[currentIndexState]);
        handleCloseModal();
    };

    useEffect((): void => {
        setCurrentIndexState(currentIndex);
    }, [currentIndex]);

    if (!visible) return null;

    return (
        <ModalContainer>
            <BackgroundImageContainer
                source={{ uri: currentImage }}
                resizeMode="contain">
                <TouchableWithoutFeedback onPress={closeOptionsMenu}>
                    <ModalInnerContainer>
                        <IconsContainer>
                            <TouchableIconContainer onPress={handleCloseModal}>
                                <Icon
                                    color={Colors.white}
                                    name={IconsConstants.antDesign.close}
                                    iconFamily={IconsTypes.antDesign}
                                    size={IconSizes.small}
                                />
                            </TouchableIconContainer>

                            {showDelete ? (
                                <Menu
                                    deleteOptionPress={deleteOptionPress}
                                    shareOptionPress={shareOptionPress}
                                    open={optionsOpen}
                                    setOpen={setOptionsOpen}
                                />
                            ) : (
                                <TouchableIconContainer
                                    onPress={shareOptionPress}>
                                    <Icon
                                        color={Colors.white}
                                        name={
                                            IconsConstants.simpleLineIcons.share
                                        }
                                        iconFamily={IconsTypes.simpleLineIcons}
                                        size={IconSizes.small}
                                    />
                                </TouchableIconContainer>
                            )}
                        </IconsContainer>

                        <IconsContainer>
                            <TouchableIconContainer onPress={navigateLeft}>
                                {currentIndexState > 0 && (
                                    <Icon
                                        color={Colors.white}
                                        name={
                                            IconsConstants.antDesign.chevronLeft
                                        }
                                        iconFamily={IconsTypes.antDesign}
                                    />
                                )}
                            </TouchableIconContainer>
                            {isNotLastPage && (
                                <TouchableIconContainer onPress={navigateRight}>
                                    <Icon
                                        color={Colors.white}
                                        name={
                                            IconsConstants.antDesign
                                                .chevronRight
                                        }
                                        iconFamily={IconsTypes.antDesign}
                                    />
                                </TouchableIconContainer>
                            )}
                        </IconsContainer>
                        <View />
                    </ModalInnerContainer>
                </TouchableWithoutFeedback>
            </BackgroundImageContainer>
        </ModalContainer>
    );
};

export default PhotoModal;
