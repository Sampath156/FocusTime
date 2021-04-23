import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet} from "react-native";
import {fontSizes, marginSizes} from '../utils/Sizes';

const minutestoMilles = (min) => min*60*1000;
const formatTime = (time) => time < 10 ? "0"+time : time;

export const Countdown = ({
  minutes = 5,
  isPaused = true,
  progressBar,
  onEnd
}) => {

  const interval = React.useRef (null);
  const countingDown = () =>
  {setMillies((time) => {
    if (time === 0) {
      onEnd();
      return time;
    }
     const timeLeft = time - 1000;
     progressBar(timeLeft / minutestoMilles(minutes));
     return timeLeft;
  })
  }

  useEffect (() => {
    setMillies(minutestoMilles(minutes))
  },[minutes])
  
  useEffect (() => {
    if(isPaused)
    {
      return;
    }
    interval.current = setInterval(countingDown,1000)

    return() => clearInterval(interval.current)
  },[isPaused]  )

  const [millies, setMillies] = useState (null);

  const minute = Math.floor(millies/1000/60) % 60;
  const secs = Math.floor(millies/1000) % 60;

  return (
    <Text style ={styles.text}> {formatTime(minute)}:{formatTime(secs)} </Text>
  );
}

const styles = StyleSheet.create({
text: {
  fontSize : fontSizes.xxl,
  color: '#fff',
  fontWeight : 'bold',
  padding: marginSizes.xxl,
  backgroundColor: 'rgba(94,132,226,0.3)',
  alignContent:'center',
  alignItems:'center',
  justifyContent:'center'
},
}
)