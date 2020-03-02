import axios from 'axios';
import {API_HOST} from 'react-native-dotenv';

const getUser = () => {
  return {
    type: 'GET_USER',
    payload: axios.get(`${API_HOST}/user/`),
  };
};

export default getUser;
