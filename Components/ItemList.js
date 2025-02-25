import {View, Text, FlatList, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import ItemCard from './ItemCard';
import {useHomeContext} from '../context/homeContext';
import {useAxios} from '../utilities/useAxios';
import LoadingComponent from './LoadingComponent';
import CustomDialog from './CustomDialog';

const ItemContent = props => {
  return (
    <View>
      <FlatList
        data={outerData?.categories}
        renderItem={item => <ItemCard categories={item} />}
      />
    </View>
  );
};

const ItemList = () => {
  const {outerList} = useHomeContext();
  const [loading, setLoading] = useState(true);
  const outerData = outerList?.data;
  console.log('cek outerData', outerList?.data);

  useEffect(() => {
    if (outerData) {
      setLoading(false);
    }
  }, [outerData]);

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
      <CustomDialog/>
    </View>
  );
};

export default ItemList;
