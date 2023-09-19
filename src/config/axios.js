//Imports
import axios from "axios";

//Variables
const instance = axios.create({
  baseURL: `${import.meta.env.VITE_URL_SERVICE}`,
  withCredentials: true,
});


//Exports
export default instance;
