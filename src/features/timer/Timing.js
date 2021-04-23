import React from "react";
import {View, StyleSheet} from "react-native";

import {RoundedButton} from '../../components/RoundedButton';

export const Timing = ({onChangeTime}) =>
{
  return(
    <View style ={{flexDirection : 'row',alignItems :'center'}}>
      <RoundedButton style ={styles.button} size ={70} title ='1' onPress = {() => onChangeTime(1)}/>
      <RoundedButton style ={styles.button} size ={70} title ='15' onPress = {() => onChangeTime(15)}/>
      <RoundedButton style ={styles.button} size ={70} title ='20' onPress = {() => onChangeTime(20)}/>
    </View>
  );
};

const styles = StyleSheet.create({
  button:
  {
    margin :20
  }
})

