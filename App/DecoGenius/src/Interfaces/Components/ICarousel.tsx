import type { FC } from 'react';
import type { IItemWithIcon } from '../../Components/Item/Interfaces/IItemWithIcon';
import type { IItemWithImage } from '../../Components/Item/Interfaces/IItemWithImage';
import type { IPatient } from '../../Components/ItemList/Interfaces/IItem';

export type TItem = FC<IItemWithIcon> | FC<IItemWithImage>;

export type ICarouselOption<T> = T & {
    handlePress?: () => void;
    componentType: FC<T>;
};

export interface ICarousel<T> {
    isCreate?: boolean;
    carouselOptionsValues: ICarouselOption<T>[];
    patient?: IPatient;
}
