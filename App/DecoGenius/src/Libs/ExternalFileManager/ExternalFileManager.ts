import RNFS from 'react-native-fs';
import type { IExternalFileManager } from './Interfaces/IExternalFileManager';
import type { IDirItem } from './Types/ExternalFileManagerTypes';
import { OSSupported } from '../../Constants/Config';
import { Platform } from 'react-native';

export const ExternalFileManager: IExternalFileManager = {
    ExternalDirectoryPath:
        Platform.OS === OSSupported.IOS
            ? RNFS.LibraryDirectoryPath
            : RNFS.ExternalDirectoryPath,
    CacheDirectoryPath: RNFS.CachesDirectoryPath,
    exists: async (path: string): Promise<boolean> => RNFS.exists(path),
    mkdir: async (path: string): Promise<void> => RNFS.mkdir(path),
    moveFile: async (file: string, path: string): Promise<void> =>
        RNFS.moveFile(file, path),
    writeFile: async (path: string, file: string): Promise<void> =>
        RNFS.writeFile(path, file, 'base64'),
    deleteFile: async (path: string): Promise<void> => RNFS.unlink(path),
    readDir: async (path: string): Promise<IDirItem[]> => RNFS.readDir(path),
    getFile: async (name: string, encoding: string): Promise<string> =>
        RNFS.readFile(name, encoding)
};
