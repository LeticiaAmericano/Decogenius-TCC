import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import type { ImageURISource } from 'react-native';
import type { IAttendanceData } from '../Entities/IAttendance';
import type { IImagesState } from '../Screens/IGallery';

export interface IGalleryComponent {
    images: IImagesState | null;
    attendances: IAttendanceData[];
    patientId: number;
    photo1?: ImageURISource | null;
    photo2?: ImageURISource | null;
    navigation: NavigationProp<ParamListBase>;
    isPhotoCompare?: boolean;
}
