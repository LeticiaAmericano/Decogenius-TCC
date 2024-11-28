import type { ImageSourcePropType } from 'react-native';
import type { ITemplateItem } from './ITemplateItem';

export interface IItemWithImage
    extends Omit<ITemplateItem, 'children' | 'backgroundColor'> {
    imageSource?: ImageSourcePropType;
}
