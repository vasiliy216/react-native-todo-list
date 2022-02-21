import React, { useState, useEffect } from 'react'
import orderBy from 'lodash/orderBy'
import { Text, View, SafeAreaView, StatusBar, FlatList } from 'react-native';
import styled from 'styled-components/native';

import Api from './utils/api'
import socket from './core/socket'
import { ItemAddComponents, ItemComponents } from './components/index'

const App = () => {

  const [items, setItems] = useState({})
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const ChangeData = data => {
    setText(data)
  }

  const OnNewItem = () => {
    Api
      .create({ text: text })
      .then((item) => {
        const newData = { type: "CREATE", payload: item.data };
        socket.emit("SERVER:ITEM_UPDATE", newData)
        UpdateTodoList(newData);
        setText('')
      })
      .catch()
  }

  const CheckedItem = id => {
    Api
      .update(id)
      .then(() => {
        const newData = { type: "UPDATE", payload: id };
        socket.emit("SERVER:ITEM_UPDATE", newData)
        UpdateTodoList(newData);
      })
      .catch(err => {
        console.log(err)
      })
  }

  const DeleteItem = id => {
    Api
      .delete(id)
      .then(() => {
        const newData = { type: "DELETE", payload: id };
        socket.emit("SERVER:ITEM_UPDATE", newData)
        UpdateTodoList(newData);
      })
      .catch(err => {
        console.log(err)
      })
  }

  const UpdateTodoList = ({ type, payload }) => {
    switch (type) {
      case "UPDATE":
        setItems(prevData => {
          return prevData.map(item => {
            if (item._id === payload) {
              return {
                ...item,
                read: !item.read
              }
            }
            return item;
          })
        }); break;
      case "CREATE": setItems(prevData => ([...prevData, payload])); break;
      case "DELETE":
        setItems(prevData => {
          return prevData.filter(item => item._id !== payload)
        }); break;
      default: return null;
    }
  }

  const fetchItem = () => {
    setIsLoading(true);
    Api
      .findAll()
      .then(items => {
        const { data } = items;
        setItems(data)
      })
      .catch(err => {
        alert(err)
      })
      .finally(e => {
        setIsLoading(false);
      })
  }

  useEffect(() => {

    fetchItem();

    socket.on("SERVER:ITEM_UPDATE", UpdateTodoList)

    return () => {
      socket.removeListener("SERVER:ITEM_UPDATE")
    }
  }, [])

  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
      <Container>
        <AddItem>
          <ItemAddComponents
            text={text}
            OnNewItem={OnNewItem}
            ChangeData={ChangeData}
          />
        </AddItem>
        <BodyItem>
          <FlatList
            onRefresh={fetchItem}
            refreshing={isLoading}
            data={orderBy(items, ['createdAt'], ['desc'])}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <ItemComponents
                id={item._id}
                text={item.text}
                read={item.read}
                CheckedItem={CheckedItem}
                DeleteItem={DeleteItem}
              />
            )}
          />
        </BodyItem>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled.View`
  width: 100%;
  height: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 16px;

  color: #5a6169;
  background: #f5f6f8;
  font-weight: 500;
`;

const AddItem = styled.View`
  display: flex;
  width: 100%;
`;

const BodyItem = styled.View`
  flex: 1;
`;

export default App