import React from "react";
import {StyleSheet, View, Text, SafeAreaView,FlatList} from "react-native";
import {RoundedButton} from '../../components/RoundedButton';

export const FocusHistory = ({focusHistory,onClear}) => {

  const ShowHistory =({item, index}) => {
    //console.log(item.subject );
    return(
      <>
      <Text style ={{color:'white',alignSelf:'center'}}> {item.subject} -- {(item.status) > 1 ? 'Cancelled' : "Completed"}</Text>
      </> 
    );
  };
  return(
    
      <>
        <SafeAreaView>
        
        {!!focusHistory.length && (
        <>
        <Text style ={{padding:30, color:'white', textAlign:'center',fontWeight:'bold',fontSize:15}}> Things focussed earlier: </Text>
        <FlatList
        style = {{flex:1}}
        contentContainerStyle ={{alignContent:'center', flex:1}}
        data = {focusHistory}
        renderItem = {ShowHistory}
        keyExtractor={item => item.index}
        />
        <View style={styles.clearContainer}>
        <RoundedButton size={60} title ="Clear" onPress = {() => onClear()} />
        </View>
        </>
        )}
        </SafeAreaView>>
        
      </>
    
  );
};

const styles = StyleSheet.create(
  {
    clearContainer:
    {
      alignItems:'center',
      padding:30
    },
    historyItem: (status) => ({
      color: status > 1 ? 'red':'green',
      fontsize :30
    }),
  }
)