import axios from 'axios';

const getUser = () => {
  return {
    type: 'GET_USER',
    payload: axios.get('http://127.0.0.1:3003/user/'),
  };
};

export default getUser;
