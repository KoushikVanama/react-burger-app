import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-3b211.firebaseio.com/'
});

export default instance;
