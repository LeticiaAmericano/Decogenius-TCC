import type { TIcon } from '../../../Interfaces/Components/IIcon';
import type { ITemplateItem } from './ITemplateItem';

export interface IItemWithIcon extends Omit<ITemplateItem, 'children'> {
    labelText?: string;
    margin?: number;
    icon: TIcon;
}
