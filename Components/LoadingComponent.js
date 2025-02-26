import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';

const LoadingComponent = () => {
  return (
    <View
      style={{
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#e8e8e8',
      }}>
      <ActivityIndicator color={'orange'} size={30} />
      <Text style={{padding: 10}}>Loading....</Text>
    </View>
  );
};

export default LoadingComponent;
