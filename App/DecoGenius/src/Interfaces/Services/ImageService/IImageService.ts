import type { IDirItem } from '../../../Libs/ExternalFileManager/Types/ExternalFileManagerTypes';

export interface IImageService {
    saveImage(file: string, path: string, name: string): Promise<string | null>;
    deleteImage(path: string): Promise<boolean | null>;
    writeImage(
        file: string,
        path: string,
        name?: string | null
    ): Promise<boolean | null>;
    getImages(path: string): Promise<IDirItem[] | null>;
    getBase64Image(photo: string): Promise<string>;
    exists(path: string): Promise<boolean>;
    readFile(path: string, encoding: string): Promise<string | null>;
    getTemporaryImages(
        patientId: number,
        attendanceId: number
    ): Promise<IDirItem[] | null>;
}

export interface IGetImagesByProcedureId {
    patientId: number;
    attendanceId: number;
    procedureId: number;
}
