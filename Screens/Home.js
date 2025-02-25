import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import HomeContextProvider, {useHomeContext} from '../context/homeContext';

const HomeContent = () => {
  const context = useHomeContext();
  console.log('cek context', context);
  return (
    <View>
      <Text>ahdasd</Text>
    </View>
  );
};

const Home = () => {

    
  return (
    <HomeContextProvider>
      <HomeContent />
    </HomeContextProvider>
    // <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    //   <Text style={styles.text}>Ini Homescreen</Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Home;
