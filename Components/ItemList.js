import {View, Text, FlatList, Modal, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import ItemCard from './ItemCard';
import {useHomeContext} from '../context/homeContext';
import {fetchAxios} from '../utilities/fetchAxios';
import LoadingComponent from './LoadingComponent';
import CustomDialog from './CustomDialog';
import CustomButton from './CustomButton';

const ItemList = () => {
  const {outerList, nestedList, refreshData} = useHomeContext();
  const [loading, setLoading] = useState(true);
  const outerData = outerList?.data;
  const innerData = nestedList;

  useEffect(() => {
    if (outerData && innerData) {
      setLoading(false);
    }
  }, [outerData, innerData]);

  const onRefresh = () => {
    setLoading(true);
    refreshData();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingComponent />
      ) : (
        <FlatList
          data={outerData?.categories}
          renderItem={item => <ItemCard categories={item} />}
        />
      )}
      {!loading && <CustomButton title="refresh" onPress={onRefresh} />}
      <CustomDialog />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
  },
});

export default ItemList;
