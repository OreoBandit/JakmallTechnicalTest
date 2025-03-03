import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React, {use, useEffect, useState} from 'react';
import CustomButton from './CustomButton';
import {useHomeContext} from '../context/homeContext';

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

const ListJokes = (props = '') => {
  const {addData} = useHomeContext();
  const {data, index} = props;

  const handleAddData = () => {
    addData(data?.category, index);
  };

  return (
    <View>
      <FlatList
        data={data?.jokes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => <InnerListContent data={item} />}
      />
      {data?.jokes?.length < 6 && (
        <CustomButton title={'add more data'} onPress={handleAddData} />
      )}
    </View>
  );
};

const EmptyJokes = () => {
  return <Text style={styles.noJoke}>no joke here</Text>;
};

const Innerlist = (props = '') => {
  const {index} = props;
  const {nestedList} = useHomeContext();

  return (
    <View style={styles.container}>
      {nestedList[index]?.jokes.length > 0 ? (
        <ListJokes data={nestedList[index]} index={index} />
      ) : (
        <EmptyJokes />
      )}
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
