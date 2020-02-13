import axios from 'axios';

export const requestProduct = config => {
  return {
    type: 'GET_PRODUCT',
    payload: axios.get('http://127.0.0.1:3003/products', config),
  };
};
