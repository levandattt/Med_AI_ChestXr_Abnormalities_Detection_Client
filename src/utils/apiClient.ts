import axios from "axios";
import {ROOT_API} from "../constants/apis";

const apiClient = axios.create({
    baseURL: ROOT_API,
});

export default apiClient;