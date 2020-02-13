import {combineReducers} from 'redux';

import auth from '../../Auth/reducer';
import product from '../../Home/reducer';
import User from '../../Home/reducerUser';
import ListCart from '../../Home/Cart/reducer';

export default combineReducers({
  auth,
  product,
  User,
  ListCart,
});
