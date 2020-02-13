import axios from 'axios';

export const addCart = dataCart => {
  return {
    type: 'ADD_CART',
    dataCart,
  };
};

export const removeCart = dataCart => {
  return {
    type: 'REMOVE_CART',
    dataCart,
  };
};

export const emptyCart = () => {
  return {
    type: 'EMPTY_CART',
  };
};

export const increaseQty = dataCart => {
  return {
    type: 'INCREMENT_CART',
    dataCart,
  };
};

export const decreseQty = dataCart => {
  return {
    type: 'DECREMENT_CART',
    dataCart,
  };
};

export const createOrder = body => {
  return {
    type: 'POST_CART',
    payload: axios.post('http://127.0.0.1:3003/order/', body),
  };
};
