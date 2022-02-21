import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';
import Button from '@ant-design/react-native/lib/button'
import InputItem from '@ant-design/react-native/lib/input-item'

const ItemAdd = props => {

    const {
        text,
        OnNewItem,
        ChangeData
    } = props

    return (
        <Group>
            <View>
                <InputItem
                    placeholder='New Item'
                    style={{ width: "100%" }}
                    value={text}
                    onChange={ChangeData}
                />
            </View>
            <Button
                type="primary"
                onPress={OnNewItem}
            >
                Add Item
            </Button>
        </Group>
    )
}

const Group = styled.View`
    display: flex;
    margin-bottom: 10px;
`;

export default ItemAdd