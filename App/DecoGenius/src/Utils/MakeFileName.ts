// Interfaces
import type { IGetDecodedFileName } from '../Interfaces/Services/ImageService/IFileManager';

export function getEncodedFileName(
    patientId: number,
    attendanceId?: number | undefined,
    procedureId?: number | undefined,
    extension = ''
): string {
    let fileName: string = `${new Date().getTime()}_${patientId}`;
    if (attendanceId) fileName += '_' + attendanceId;
    if (procedureId) fileName += '_' + procedureId;
    fileName += `.${extension}`;
    return fileName;
}

export function getDecodedFileName(fileName: string): IGetDecodedFileName {
    const [base, extension]: string[] = fileName.split('.');
    const [date, userId, patientId, attendanceId]: string[] = base.split('_');
    return {
        userId: parseInt(userId, 10),
        patientId: parseInt(patientId, 10),
        attendanceId: attendanceId ? parseInt(attendanceId, 10) : null,
        extension: extension,
        createdAt: new Date(parseInt(date, 10))
    };
}
