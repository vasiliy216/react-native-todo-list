import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';
import Checkbox from '@ant-design/react-native/lib/checkbox'
// import Icon from '@ant-design/react-native/lib/icon'
// import { outlineGlyphMap } from '@ant-design/icons-react-native/lib/outline'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'

const Item = props => {

    const {
        id,
        text,
        read,
        CheckedItem,
        DeleteItem
    } = props

    return (
        <ItemWrapper>
            <ItemWrapperCheckbox>
                <MaterialCommunityIcons
                    name={`${read ? "checkbox-marked" : "checkbox-blank-outline"}`}
                    size={24}
                    color="#007bff"
                    onPress={CheckedItem.bind(this, id)}
                />
            </ItemWrapperCheckbox>
            <ItemWrapperText>
                <ItemText read={read}>{text}</ItemText>
            </ItemWrapperText>
            <ItemWrapperDelete>
                <AntDesign
                    name="delete"
                    size={24}
                    color="#c4183c"
                    onPress={DeleteItem.bind(this, id)}
                />
            </ItemWrapperDelete>
        </ItemWrapper>
    )
}

const ItemWrapper = styled.View`
    display: flex;

    flex-direction: row;
    align-items: center;

    background-color: #fff;
    
    border-radius: 5px;
    border: 1px solid #e1e5eb;
    
    margin-bottom: 10px;
`;

// shadow-color: #000;
//     shadow-offset: {
//         width: 0,
//         height: 2,
//     };
//     shadow-opacity: 0.25;
//     shadow-radius: 4;

//     elevation: 5;

const ItemWrapperCheckbox = styled.View`
    padding: 15px;
`;

const ItemWrapperText = styled.View`
    padding-top: 20px;
    padding-bottom: 20px;
    flex-shrink: 1;
`;

const ItemWrapperDelete = styled.View`
    padding: 15px;
    margin-left: auto;
    color: #c4183c;
`;

const ItemText = styled.Text`
    font-size: 16px;
    margin: 0;
    padding: 0;
    text-decoration: ${props => props.read ? 'line-through' : ''};
`;

export default Item