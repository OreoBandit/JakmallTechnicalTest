import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeContextProvider, {useHomeContext} from '../context/homeContext';
import ItemList from '../Components/ItemList';

const HomeContent = () => {
  return (
    <View style={styles.containerView}>
      <Text style={styles.text}>Technical Test Jakmall.com</Text>
      <Text style={styles.name}>Muhammad Brahmantyo Oktaviga</Text>
      <ItemList />
    </View>
  );
};

const Home = () => {
  return (
    <HomeContextProvider>
      <HomeContent />
    </HomeContextProvider>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    padding: 16,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  name: {
    // padding: 16,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Home;
