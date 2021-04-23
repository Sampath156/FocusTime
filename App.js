import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Focus } from './src/features/Focus/Focus';
import { Timer } from './src/features/timer/Timer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FocusHistory } from './src/features/Focus/FocusHistory';

const STATUS = {
  COMPLETE: 1,
  CANCELLED: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const setFocusHistoryStatus = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status }]);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (focusHistory && JSON.stringify(focusHistory).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  useEffect(() => {
    loadFocusHistory();
  }, []);

  console.log(focusHistory);
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            setFocusHistoryStatus(focusSubject, STATUS.COMPLETE);
            setFocusSubject(null);
          }}
          onCancel={() => {
            setFocusHistoryStatus(focusSubject, STATUS.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <View>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252250',
  },
  history: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32,
  },
});
