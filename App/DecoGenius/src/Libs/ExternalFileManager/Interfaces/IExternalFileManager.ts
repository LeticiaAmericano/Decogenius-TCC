import type { IDirItem } from '../Types/ExternalFileManagerTypes';

export interface IExternalFileManager {
    ExternalDirectoryPath: string;
    CacheDirectoryPath: string;
    exists: (path: string) => Promise<boolean>;
    mkdir: (path: string) => Promise<void>;
    moveFile: (file: string, path: string) => Promise<void>;
    writeFile: (path: string, file: string) => Promise<void>;
    deleteFile: (path: string) => Promise<void>;
    readDir: (path: string) => Promise<IDirItem[]>;
    getFile: (name: string, encoding: string) => Promise<string>;
}
