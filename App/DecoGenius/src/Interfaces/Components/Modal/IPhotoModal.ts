import type { IAttendanceData } from '../../Entities/IAttendance';

export interface IPhotoModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    images: string[];
    currentIndex: number;
    showDelete: boolean;
    patientId: number;
    attendances: IAttendanceData[];
    handleFooterClick?: () => void;
    showFooter?: boolean;
}

export interface IMenuProps {
    shareOptionPress: () => void;
    deleteOptionPress: () => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}
