import axios from 'axios';
import {API_HOST} from 'react-native-dotenv';

export const requestProduct = () => {
  return {
    type: 'GET_PRODUCT',
    payload: axios.get(`${API_HOST}/products`),
  };
};

export const updateUser = (body, id_user) => {
  return {
    type: 'PUT_USER',
    payload: axios.put(`${API_HOST}/user/edituser/${id_user}`, body),
  };
};
