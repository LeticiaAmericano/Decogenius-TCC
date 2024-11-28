import type { ReactElement } from 'react';
import React from 'react';
import type {
    ICarousel,
    ICarouselOption
} from '../../Interfaces/Components/ICarousel';
import { Container, ContainerCarousel } from './styles';
import uuid from 'react-native-uuid';
import { useWindowDimensions } from 'react-native';
import { CarouselConstants } from '../../Constants/Components/Carousel';

const Carousel = <T,>({
    carouselOptionsValues
}: ICarousel<T>): ReactElement<ICarousel<T>> => {
    const screenWidth = useWindowDimensions().width;

    const threshold =
        screenWidth > CarouselConstants.threshholdValue
            ? CarouselConstants.tabletThreshhold
            : CarouselConstants.mobileThreshhold;
    const isScrollEnabled = carouselOptionsValues.length > threshold;

    return (
        <ContainerCarousel
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={isScrollEnabled}>
            <Container>
                {carouselOptionsValues.map((item: ICarouselOption<T>) => {
                    const id = uuid.v4();
                    return <item.componentType key={id.toString()} {...item} />;
                })}
            </Container>
        </ContainerCarousel>
    );
};

export default Carousel;
