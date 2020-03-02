import axios from 'axios';
import {API_HOST} from 'react-native-dotenv';

export const requestProduct = config => {
  return {
    type: 'GET_PRODUCT',
    payload: axios.get(`${API_HOST}/products`, config),
  };
};
