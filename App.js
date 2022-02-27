import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { View,Keyboard } from 'react-native';
import styled from 'styled-components';
import Users from './Users';

const Input = styled.TextInput`
border :1px solid green;
width : 200px;
borderRadius : 15px;
color : white;
`


const Container = styled.View`
  flex: 1;
  padding : 40px;
  backgroundColor: #212426;
  alignItems: center;
`;

const ButtonContainer = styled.TouchableOpacity`
  width: 120px;
  height: 40px;
  padding: 12px;
  borderRadius: 10px;
  backgroundColor: #00B852;
  color : white;
  alignItems: center;
  justifyContent: center;
  marginTop : 10px;
`;

const TextContainer = styled.Text`
fontWeight : bold;
fontSize : 20px;
marginBottom : 10px;
color : white
`

const SubText = styled.Text`
color : white
`

export default function App() {

  const [users, setUsers] = useState([{ "name": "Akshay" }]);
  const [counterOne, setCounterOne] = useState(0);
  const [counterTwo, setCounterTwo] = useState(0);
  const [text, setText] = useState("");


  useEffect(() => {
    console.log('Parent rendering..!!!')
  });

  /* useMemo example.. 
  Due to checkIsEven getting computed on every render even when counterOne has not changed, it takes time to 
   change counterTwo and render..as all computation are done again..which is unneccessary.. this can be avoided by memoising the computated
  value of expensive function checkIsEven and computing it only when its dependant value changes..
  */
  
  const incrementCounterOne = ()=> {
    setCounterOne((t)=> t + 1)
  }

  const incrementCounterTwo = ()=> {
    setCounterTwo((t)=> t + 1)
  }

  // const checkIsEven = () => {
  //   //immitation of some expensive function
  //     let i =  99999999;
  //     while (i > 1) {
  //       --i
  //     }
  //     return counterOne % 2 == 0;
  // }

  // if we use above function it will recalculate on every irrespective whether counterOne changes or not..
  const IsEven = useMemo(()=>{
      //immitation of some expensive function
      let i =  99999999;
      while (i > 1) {
        --i
      }
      return counterOne % 2 == 0;
  },[counterOne]);


  const handleText = (text) => {
    setText(text)
  }

  const handleAddUser = () => {
    if (text == '')
      return;
    setUsers((u) => [...u, { "name": text }]);
    setText('');
    Keyboard.dismiss();
  }

  /*
  useCallback example
  if this below function is used, then on rendering of parent component (eg.when user type in the input field) viz App.js, 
  child component viz Users.js also gets re-rendered due to function handleRemove again getting redefined on render
  */
  
  // const handleRemove = (name) => {
  //   setUsers(users.filter((u)=>u.name !== name));
  // }

  const handleRemove = useCallback((name) => {
    setUsers(users.filter((u) => u.name !== name));
  }, [users])
  /*
  Above function when passed to Child component will not cause unnessary re-render of Child. We passed dependency to know useCallback when it need to
  redefine the function.
  */

  return (
    <Container>
      <>
        <TextContainer>Example : useMemo</TextContainer>
        <SubText>Counter One : {counterOne} Is Even/Odd : {IsEven ? 'Even' : 'Odd'} </SubText>
        <SubText>Counter Two : {counterTwo}</SubText>
        <View style={{flexDirection : 'row'}}>
        <ButtonContainer style={{marginRight : 10}} onPress={incrementCounterOne}><SubText>Counter One +</SubText></ButtonContainer>
        <ButtonContainer onPress={incrementCounterTwo}><SubText>Counter Two +</SubText></ButtonContainer>
        </View>
      </>

      <View style={{marginTop : 40,alignItems : 'center'}}>
        <TextContainer>Example : useCallback</TextContainer>
        <Input placeholder="Enter user" value={text} onChangeText={handleText} placeholderTextColor="white" />
        <ButtonContainer onPress={handleAddUser}><SubText>Add User</SubText></ButtonContainer>
        <Users data={users} onRemove={handleRemove} />
      </View>
    </Container>
  );

}
