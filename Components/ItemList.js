import {View, Text, FlatList, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import ItemCard from './ItemCard';
import {useHomeContext} from '../context/homeContext';
import {useAxios} from '../utilities/useAxios';
import LoadingComponent from './LoadingComponent';
import CustomDialog from './CustomDialog';
import CustomButton from './CustomButton';

const ItemList = () => {
  const {outerList, nestedList} = useHomeContext();
  const [loading, setLoading] = useState(true);
  const outerData = outerList?.data;
  const innerData = nestedList;
  console.log('cek outerData', outerList?.data);

  useEffect(() => {
    if (outerData && innerData) {
      setLoading(false);
    }
    console.log('cek datas', {outerData: outerData, innerData: innerData});
  }, [outerData, innerData]);

  return (
    <View
      style={{flex: 1, width: '100%', padding: 10, backgroundColor: 'white'}}>
      {loading ? (
        <LoadingComponent />
      ) : (
        <FlatList
          data={outerData?.categories}
          renderItem={item => <ItemCard categories={item} />}
        />
      )}
      <CustomButton title="refresh" />
      <CustomDialog />
    </View>
  );
};

export default ItemList;
