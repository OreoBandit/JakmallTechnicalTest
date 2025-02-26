import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const CustomButton = (props = '') => {
  const {title, onPress, content} = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'orange',
    marginHorizontal: 12,
    borderRadius: 12,
    marginTop: 10,
  },
  text: {
    textAlign: 'center',
  },
});

export default CustomButton;
