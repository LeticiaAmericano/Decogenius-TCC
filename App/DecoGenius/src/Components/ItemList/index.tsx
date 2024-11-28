import React from 'react';
import Colors from '../../Constants/Colors';
import Item from './Components/Item';
import { Container, ScrollViewItems, } from './styles';
import { IRoomsResponse } from '../../Interfaces/Entities/IRooms';
import { IItemList } from '../../Interfaces/Components/IItemList';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';

const ItemList: React.FC<IItemList> = ({
    data,
    navigationScreen,
    navigationParams
}) => {

    return (
        <Container>
            <ScrollViewItems nestedScrollEnabled>
                {data.length > 0 &&
                    data.map((value: IRoomsResponse, index: number) => (
                        <Item
                            key={uuidv4()}
                            backgroundColor={
                                index % 2 === 0
                                    ? Colors.second
                                    : Colors.gray[100]
                            }
                            color={
                                index % 2 === 0
                                    ? Colors.gray[100]
                                    : Colors.second
                            }
                            value={{ ...value, ...navigationParams }}
                            navigationScreen={navigationScreen}
                        />
                    ))}
            </ScrollViewItems>
        </Container>
    );
};

export default ItemList;
