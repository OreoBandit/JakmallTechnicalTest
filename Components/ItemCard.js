import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Innerlist from './Innerlist';
import {useAxios} from '../utilities/useAxios';
import CustomButton from './CustomButton';
import {useHomeContext} from '../context/homeContext';

const ItemCard = (props = '') => {
  const {goTop} = useHomeContext();
  const [isUp, setIsUp] = useState(false);
  const {index = props?.categories?.index, name = props?.categories?.item} =
    props;

  const togglePress = () => {
    setIsUp(isUp => !isUp);
  };

  return (
    <View>
      <TouchableOpacity onPress={togglePress}>
        <View>
          <View style={style.button}>
            <View style={style.titleSection}>
              <Text style={style.textBtn}>{index + 1}.</Text>
              <Text style={style.textBtn}>{name}</Text>
            </View>
            <View style={style.btnSection}>
              <CustomButton title={'GO TO TOP'} onPress={() => goTop(index)} />
              <Text>{isUp ? 'A' : 'V'}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {isUp && <Innerlist index={index} />}
    </View>
  );
};

const style = StyleSheet.create({
  button: {
    padding: 8,
    flexDirection: 'row',
    margin: 4,
    backgroundColor: '#e8e8e8',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topText: {
    padding: 10,
    color: 'orange',
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 12,
  },
  topButton: {
    padding: 10,
    backgroundColor: 'orange',
    marginHorizontal: 12,
    borderRadius: 12,
  },
  btnSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textBtn: {
    fontSize: 20,
    paddingRight: 8,
  },
  titleSection: {
    flexDirection: 'row',
  },
});

export default ItemCard;
