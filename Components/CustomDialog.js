import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Dialog from 'react-native-dialog';
import {useHomeContext} from '../context/homeContext';

const CustomDialog = () => {
  const {modal, closeModal, modalContent} = useHomeContext();
  return (
    <View>
      <Dialog.Container
        visible={modal}
        onBackdropPress={closeModal}
        contentStyle={styles.dialogContainer}>
        <Dialog.Description>
          <Text style={styles.dialogText}>{modalContent}</Text>
        </Dialog.Description>
        <Dialog.Button onPress={closeModal} color={'red'} label="Ok" bold />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: '#fff',
    color: 'black',
    borderRadius: 18,
  },
  dialogText: {
    color: 'black',
  },
});

export default CustomDialog;
