import React, { useState, useEffect } from 'react'
// import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView, StatusBar } from 'react-native';
import styled from 'styled-components/native';

import { ItemAddComponents, ItemComponents } from './components/index'

const App = () => {

  const [items, setItems] = useState({})
  const [text, setText] = useState('')

  const ChangeData = data => {
    setText(data)
  }

  const OnNewItem = () => {
    Api
      .create({ text: text })
      .then((item) => {

        const { data } = item;

        setText('')
        setItems(prevData => ([...prevData, data]))
      })
      .catch()
  }

  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
      <Container>
        <Additem>
          <ItemAddComponents
            text={text}
            OnNewItem={OnNewItem}
            ChangeData={ChangeData}
          />
        </Additem>
        <BodyItem>
          <ItemComponents />
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
  padding: 20px 16px;

  color: #5a6169;
  background: #f5f6f8;
  font-weight: 500;
`;

const Additem = styled.View`
  display: flex;
  width: 100%;
`;

const BodyItem = styled.View`
  
`;

export default App