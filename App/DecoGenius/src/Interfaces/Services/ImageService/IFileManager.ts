import type { IDirItem } from '../../../Libs/ExternalFileManager/Types/ExternalFileManagerTypes';

export interface IFileManager {
    saveFile(file: string, path: string, name?: string): Promise<string | null>;
    deleteFile(file: string): Promise<boolean | null>;
    writeFile(
        file: string,
        path: string,
        name: string | null
    ): Promise<boolean | null>;
    getFiles(folderPath: string): Promise<IDirItem[] | null>;
    readFile(path: string, encoding: string): Promise<string | null>;
    exists(path: string): Promise<boolean>;
}
