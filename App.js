import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Home from './Screens/Home';

const App = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Home />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
