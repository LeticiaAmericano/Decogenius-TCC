import type NavigateConstants from '../../Constants/Navigate';
import type {
    IAttendanceData,
    IAttendanceDataProps
} from '../Entities/IAttendance';
import type { IPatientData } from '../Entities/IPatient';
import type { IProcedureData } from '../Entities/IProcedure';
import { IRoomsResponse } from '../Entities/IRooms';

export interface IItemListData {
    name: string;
}

export type ItemData =
    | IItemListData[]
    | IPatientData[]
    | IAttendanceData[]
    | IProcedureData[];

export type ItemNavigationScreens =
    | NavigateConstants.Attendance
    | NavigateConstants.MenuPatient
    | NavigateConstants.CreateViewProcedure;

export type ItemNavigationParams =
    | Pick<IAttendanceDataProps, 'attendances'>
    | IPatientData
    | IProcedureData;

export interface IItemList {
    data: IRoomsResponse[];
    navigationScreen?: ItemNavigationScreens;
    navigationParams?: ItemNavigationParams;
}
