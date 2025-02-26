import axios from 'react-native-axios';

export const fetchAxios = async url => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (e) {}
};
