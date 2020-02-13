import axios from 'axios';

export const requestProduct = () => {
  return {
    type: 'GET_PRODUCT',
    payload: axios.get('http://127.0.0.1:3003/products'),
  };
};

export const updateUser = (body, id_user) => {
  return {
    type: 'PUT_USER',
    payload: axios.put(`http://127.0.0.1:3003/user/edituser/${id_user}`, body),
  };
};
