import React,{useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {TextInput} from 'react-native-paper';
import {RoundedButton} from '../../components/RoundedButton';
import {fontSizes, marginSizes} from '../../utils/Sizes';


export const Focus = ({addSubject}) =>
{
  const [subject, setSubject] = useState(null);
    return (
    <View style={styles.container}>
    <View style = {styles.titlecontainer}>
      <Text style = {styles.title}> What do you want to Focus today? </Text>
        <View style={styles.inputContainer}>
          <TextInput style={{flex:1,marginRight :marginSizes.md}} 
              onSubmitEditing = {({nativeEvent}) =>
              {setSubject(nativeEvent.text)}} />
          
          <RoundedButton title= "+" size ={50} 
          onPress = {() => {addSubject(subject)}}/>
        </View>
    </View>
    
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
  },

  titlecontainer:
  {
    flex : 0.5,
    padding: marginSizes.md,
    justifyContent : 'centre',
  },

  title :  {
    color :"white",
    fontWeight : 'bold',
    fontSize : fontSizes.md,
  },

  inputContainer : {
    paddingTop : marginSizes.md,
    flexDirection:'Row',
    alignItems :'center'
  }
  
});
