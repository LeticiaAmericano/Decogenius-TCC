import styled from 'styled-components/native';
import Colors from '../../Constants/Colors';

export const Container = styled.View`
    flex: 1;
    background-color: ${Colors.gray[100]};
`;

export const HeaderContainer = styled.View`
    padding: 16px;
    align-items: center;
    justify-content: center;
`;

export const LabelText = styled.Text`
    font-family: 'ChakraPetch-SemiBold';
    font-size: 20px;
    color: ${Colors.primary};
`;

export const ContainerBody = styled.View`
    flex: 1;
    padding: 16px;
`;

export const ModelContainer = styled.View`
    width: 100%;
    height: 80%;
    background-color: ${Colors.gray[200]};
    border-radius: 8px;
    overflow: hidden;
`;

export const RoomControlsContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    width: 100%;
`;

export const RoomControlButton = styled.TouchableOpacity`
    background-color: ${Colors.primary};
    padding: 8px 16px;
    border-radius: 8px;
`;

export const RoomControlText = styled.Text`
    color: ${Colors.gray[100]};
    font-family: 'ChakraPetch-SemiBold';
    font-size: 14px;
`;

export const DimensionsContainer = styled.View`
    padding: 16px;
`;

export const DimensionItem = styled.View`
    margin-bottom: 8px;
`;

export const DimensionText = styled.Text`
    font-family: 'ChakraPetch-Regular';
    font-size: 14px;
    color: ${Colors.gray[800]};
`;

export const RoomTypeText = styled.Text`
    font-family: 'ChakraPetch-SemiBold';
    font-size: 16px;
    color: ${Colors.primary};
`;

export const LoadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const LoadingText = styled.Text`
    font-family: 'ChakraPetch-Regular';
    font-size: 16px;
    color: ${Colors.gray[800]};
    margin-top: 16px;
`;

