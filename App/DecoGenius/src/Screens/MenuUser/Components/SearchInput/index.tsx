import React from 'react';
import { Container, ContainerIcon, SearchInputContainer } from './styles';
import Icon from '../../../../Components/Icon';
import SimpleInput from '../../../../Components/Input/SimpleInput';
import Colors from '../../../../Constants/Colors';
import {
    IconsConstants,
    IconsTypes
} from '../../../../Libs/ExternalIconsLibrary';
import type { ISearchInput } from '../../Interface/ISearchInput';

const SearchInput = ({ value, onUpdate }: ISearchInput): JSX.Element => (
    <Container>
        <ContainerIcon>
            <Icon
                iconFamily={IconsTypes.fontAwesome}
                name={IconsConstants.fontAwesome.search}
            />
        </ContainerIcon>
        <SearchInputContainer>
            <SimpleInput
                onChangeText={onUpdate}
                value={value}
                textColor={Colors.gray[900]}
                mainColor={Colors.gray[200]}
            />
        </SearchInputContainer>
    </Container>
);

export default SearchInput;
