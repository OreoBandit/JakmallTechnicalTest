import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React, {use, useEffect, useState} from 'react';
import CustomButton from './CustomButton';
import {useHomeContext} from '../context/homeContext';
import {useAxios} from '../utilities/useAxios';

const InnerListContent = (data = {}) => {
  const {openModal} = useHomeContext();
  const jokeData = data?.data;
  const jokeContent = jokeData.item?.joke;
  return (
    <TouchableOpacity
      style={styles.jokeContent}
      onPress={() => openModal(jokeContent)}>
      <Text style={{}} numberOfLines={10}>
        {jokeContent}
      </Text>
    </TouchableOpacity>
  );
};

const ListJokes = (jokes = '') => {
  console.log('cek jokes 3', jokes);
  const data = jokes?.jokes;

  return (
    <View>
      <FlatList
        data={data}
        renderItem={item => <InnerListContent data={item} />}
      />
      <CustomButton title={'Add More Data'} />
    </View>
  );
};

const EmptyJokes = () => {
  return <Text style={styles.noJoke}>no joke here</Text>;
};

const Innerlist = (props = '') => {
  const {data} = props;
  const jokes = data?.jokes;

  console.log('cek inner data', jokes);
  return (
    <View style={styles.container}>
      {jokes ? <ListJokes jokes={jokes} /> : <EmptyJokes />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#b5b5b5',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  jokeContent: {
    backgroundColor: '#ebebeb',
    borderRadius: 12,
    margin: 1,
    padding: 10,
  },
  noJoke: {
    backgroundColor: '#ebebeb',
    borderRadius: 12,
    margin: 1,
    padding: 10,
    textAlign: 'center',
  },
});

export default Innerlist;
