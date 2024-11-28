import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const IconsConstants = {
    fontAwesome: {
        arrowLeft: 'arrow-left',
        search: 'search',
        user: 'user',
        eye: 'eye',
        eyeSlash: 'eye-slash',
        stop: 'stop',
        videoCamera: 'video-camera',
        pause: 'pause',
        play: 'play',
        close: 'close',
        send: 'send',
        logout: 'sign-out',
        share: 'share-alt',
        thList: 'th-list',
        camera: 'camera',
        plus: 'plus',
        image: 'image',
        save: 'save',
        chevronDown: 'chevron-down',
        chevronUp: 'chevron-up',
        minusSquareO: 'minus-square-o',
        file: 'file'
    },
    antDesign: {
        plus: 'plus',
        medicineBox: 'medicinebox',
        form: 'form',
        chevronDown: 'down',
        chevronUp: 'up',
        chevronLeft: 'left',
        chevronRight: 'right',
        close: 'close'
    },
    materialIcons: {
        switchCamera: 'switch-camera',
        edit: 'edit',
        photoLibrary: 'photo-library',
        compare: 'compare'
    },
    feather: {
        users: 'users'
    },
    fontisto: {
        file: 'file-1',
        trash: 'trash'
    },
    materialCommunityIcons: {
        imageComparison: 'image-filter-black-white',
        dotsVertical: 'dots-vertical'
    },
    simpleLineIcons: {
        lock: 'lock',
        share: 'share'
    }
};

const IconsTypes = {
    feather: 'Feather',
    antDesign: 'AntDesign',
    fontisto: 'Fontisto',
    materialCommunityIcons: 'MaterialCommunityIcons',
    materialIcons: 'MaterialIcons',
    simpleLineIcons: 'SimpleLineIcons',
    fontAwesome: 'FontAwesome'
};

enum IconSizes {
    small = 'small',
    medium = 'medium',
    large = 'large',
    extraSmall = 'extra small'
}

const iconMap = {
    [IconsTypes.fontisto]: Fontisto,
    [IconsTypes.antDesign]: AntDesign,
    [IconsTypes.materialCommunityIcons]: MaterialCommunityIcons,
    [IconsTypes.simpleLineIcons]: SimpleLineIcons,
    [IconsTypes.feather]: Feather,
    [IconsTypes.materialIcons]: MaterialIcons,
    [IconsTypes.fontAwesome]: FontAwesome
};

const iconFontSizes: Record<string, number> = {
    large: 40,
    medium: 35,
    'extra small': 20,
    small: 25,
    default: 25
};
export { IconSizes, IconsConstants, IconsTypes, iconFontSizes, iconMap };
