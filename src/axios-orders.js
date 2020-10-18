// axios instance for handling the requests for burger orders
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_FIREBASE_DB_ENDPOINT
});

export default instance;
