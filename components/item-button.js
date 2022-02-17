import React from 'react'
import { Text, View } from 'react-native';
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
                    onChange={e => ChangeData(e.target.value)}
                />
            </View>
            <Button
                // style={{marginLeft: 'auto'}}
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

`;

export default ItemAdd