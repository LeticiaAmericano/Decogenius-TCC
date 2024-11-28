import NavigateConstants from '../../../Constants/Navigate';
import { IconsConstants, IconsTypes } from '../../../Libs/ExternalIconsLibrary';

import ItemWithIcon from '../../Item/ItemWithIcon';
import type { ICarouselOption } from '../../../Interfaces/Components/ICarousel';
import type { IItemWithIcon } from '../../Item/Interfaces/IItemWithIcon';
import { handleDeletePatientPress } from './CarouselPressActions';
import type { ICarouselRules } from '../../../Interfaces/Rules/ICarouselRules';
import { EModalType } from '../../../Constants/Hooks/useModal';

export function getCarouselOptions({
    user,
    patient,
    attendances,
    navigation,
    openModal,
    translation,
    handleFeedback,
    theme
}: ICarouselRules): Record<string, ICarouselOption<IItemWithIcon>> {
    const options: Record<string, ICarouselOption<IItemWithIcon>> = {};

    options.CreateEditPatient = {
        labelText: translation('carousel.title.createEditPatient'),
        icon: {
            iconFamily: IconsTypes.fontisto,
            iconName: IconsConstants.fontisto.file
        },
        handlePress: () => {
            navigation.navigate(NavigateConstants.CreateEditPatient, {
                patient: patient,
                isCreate: false
            });
        },
        componentType: ItemWithIcon
    };

    options.imageComparison = {
        labelText: translation('carousel.title.imageComparison'),
        handlePress: () => {
            navigation.navigate(NavigateConstants.AttendanceGallery, {
                patientId: patient.id as number,
                attendances: attendances
            });
        },
        icon: {
            iconFamily: IconsTypes.materialCommunityIcons,
            iconName: IconsConstants.materialCommunityIcons.imageComparison
        },
        componentType: ItemWithIcon
    };

    options.permissionPatient = {
        labelText: translation('carousel.title.permissionPatient'),
        handlePress: () => {
            navigation.navigate(NavigateConstants.PermissionPatient, {
                patient: patient
            });
        },
        icon: {
            iconFamily: IconsTypes.simpleLineIcons,
            iconName: IconsConstants.simpleLineIcons.lock
        },
        componentType: ItemWithIcon
    };

    options.gallery = {
        labelText: translation('carousel.title.gallery'),
        handlePress: () => {
            navigation.navigate(NavigateConstants.PhotoCompareGallery, {
                patientId: patient.id as number,
                attendances: attendances
            });
        },
        icon: {
            iconFamily: IconsTypes.materialIcons,
            iconName: IconsConstants.materialIcons.photoLibrary
        },
        componentType: ItemWithIcon
    };

    options.uploadPhoto = {
        labelText: translation('carousel.title.uploadPhoto'),
        handlePress: () => {
            openModal([
                {
                    type: EModalType.uploadPhoto,
                    value: {
                        patient: patient,
                        attendances: attendances,
                        navigation: navigation
                    }
                }
            ]);
        },
        icon: {
            iconFamily: IconsTypes.feather,
            iconName: IconsConstants.feather.upload
        },
        componentType: ItemWithIcon
    };

    options.deletePatient = {
        labelText: translation('carousel.title.deletePatient'),
        handlePress: async () => {
            openModal([
                {
                    type: EModalType.confirmation,
                    value: {
                        action: () =>
                            handleDeletePatientPress(
                                navigation,
                                patient,
                                user.token,
                                handleFeedback
                            )
                    }
                }
            ]);
        },
        icon: {
            iconFamily: IconsTypes.fontisto,
            iconName: IconsConstants.fontisto.trash
        },
        backgroundColor: theme.colors.red[500],
        componentType: ItemWithIcon
    };

    return options;
}
