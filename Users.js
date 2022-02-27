import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

const Card = styled.View`
padding : 10px;
backgroundColor : palevioletred;
borderRadius : 10px;
flexDirection : row;
marginBottom : 10px;
justifyContent : space-between;
width : 120px
`
const ImageContainer = styled.Image`
width : 22px;
height : 22px
`


const SubText = styled.Text`
color : white
`

const Users = ({ data,onRemove }) => {


    useEffect(()=>{
        console.log("Child rendering....!!!!")
    })

    return(
        <View style={{marginTop : 10 }}>
            {data.map((item,index)=>{
               return(
                    <Card key={index}>
                        <View>
                        <SubText>{item.name}</SubText>
                        </View>
                        <TouchableOpacity  onPress={()=>onRemove(item.name)}>
                        <ImageContainer style={{}} source={require('./src/Assets/icons/remove_icon.png')}/>
                        </TouchableOpacity>
                    </Card>
               ); 
            })}
        </View>
    );
}


export default React.memo(Users)