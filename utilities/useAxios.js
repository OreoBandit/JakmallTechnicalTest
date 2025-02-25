import {useEffect} from 'react';
import axios from 'react-native-axios';

export const useAxios = async url => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (e) {
    console.log('error fetching', e);
  }
};
