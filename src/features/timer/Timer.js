import React, {useState} from "react";
import {Text, StyleSheet, View,Vibration} from "react-native";
import {ProgressBar} from "react-native-paper";
import {marginSizes} from '../../utils/Sizes';
import {Countdown} from '../../components/Countdown';
import {RoundedButton} from '../../components/RoundedButton';
import {Timing} from './Timing';

import {useKeepAwake} from "expo-keep-awake";

export const Timer = ({focusSubject,onTimerEnd,onCancel}) =>
{
  useKeepAwake();
  const [isStarted,setIsStarted] = useState(false);
  const [progress,setProgress] = useState(1);
  const [minutes,setMinutes] = useState(0.1);
  const progressBar = (progress) => {
    setProgress (progress);
    onTimerEnd;
  }

  const onEnd = () => {
    //Vibration.vibrate(10000);
    onTimerEnd();
    setIsStarted(false);
  }

  
  const changeTime = (time) =>
  {
    setMinutes(time);
    //console.log(time);
    setProgress(1);
    setIsStarted (false);
  }
  return(
    <View style={styles.container}>
      <View style = {styles.countdown}>
        <Countdown minutes ={minutes} isPaused = {!isStarted} progressBar = {progressBar} onEnd ={onEnd}/>
      </View>
      <View style = {{paddingTop: marginSizes.lg}}>
        <Text style = {styles.title}> Focussing on </Text>
        <Text style ={ styles.task}> {focusSubject} </Text>
      </View >
      <View style ={{paddingTop: marginSizes.sm}}>
        <ProgressBar 
          progress = {progress}
          color = '#5E84E2'
          style ={{height:8}}/>
      </View>
      <View style ={styles.buttonWrapper}>
        <Timing onChangeTime = {changeTime} />
      </View>
      <View style = {styles.buttonWrapper}>
      {!isStarted ? (
      <RoundedButton title = "Start" size= {100} onPress = {() =>setIsStarted    (true)}
       />) : (
       <RoundedButton title = "Pause" size = {100} onPress = {() =>setIsStarted (false)} style={{justifyContent:'center'}}/> )}
       </View>
       <View style ={styles.buttonWrapper}>
        <RoundedButton title = 'cancel' size ={50} onPress ={()=>{
          onCancel();
        }} />
       </View>
    </View>
  );
};

const styles = StyleSheet.create ({
  container :
  {
    flex :1,
  },

  title :
  {
    textAlign : 'center',
    color : '#fff',
    
  },

  task :
  {
    textAlign : 'center',
    color : '#fff',
    fontWeight : 'bold',
  },

  countdown :
  {
    textAlign : 'center',
    flex : 0.5,
    justifyContent : 'center',

  },
  buttonWrapper : {
    alignItems :'center',
    padding: 15,
    justifyContent : 'center',
    flex :0.3,
    flexDirection : 'row',

  }
  
});