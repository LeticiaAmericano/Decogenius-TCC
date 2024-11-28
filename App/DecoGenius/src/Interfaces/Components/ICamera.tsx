import type { TExternalCameraDevice } from '../../Libs/ExternalCameraLibrary/Interfaces/IExternalCameraLibrary.ts';

export interface IVideo {
    uri: string;
}

export type ICameraTypes = 'photo' | 'video';

export interface ICamera {
    type: ICameraTypes;
    device: TExternalCameraDevice;
    flash?: boolean;
    cameraType: 'front' | 'back';
}

export interface ICameraObject {
    photo?: boolean;
    video?: boolean;
    audio?: boolean;
}

export interface IPhotoCameraProps extends ICamera {
    type: 'photo';
    onCapture: (photo: IVideo) => void;
}

export interface IVideoCameraProps extends ICamera {
    type: 'video';
    onRecordingStart: () => void;
    onRecordingEnd: (video: IVideo) => void;
    onRecordingError: (error: string) => void;
}

export type ICameraProps = IPhotoCameraProps | IVideoCameraProps;
