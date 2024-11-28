// Interfaces
import type {
    IItemListData,
    ItemNavigationScreens
} from '../../../Interfaces/Components/IItemList';
import type { sex } from '../../../Types/TypeAutoComplete';

export interface IProcedureData {
    id: number;
    local_application: string;
    procedure_type: number;
    procedure_name?: string;
    products: number[];
    attendance: number;
    created_at: string;
    updated_at: string;
    procedure_type_name?: string;
}

export interface IItem {
    backgroundColor?: string;
    value: IRooms;
    navigationScreen?: ItemNavigationScreens;
    color?: string;
}

export interface IContainerItem {
    backgroundColor: string;
}

export interface IItemTextItem {
    color: string;
}

export interface IPatient {
    id?: number;
    name: string;
    dateOfBirth: string;
    sex?: sex;
    cpf: string;
    phoneNumber: string;
    email: string;
}
