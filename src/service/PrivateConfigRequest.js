import axios from "axios";
import { getStore } from "../utils/helper";
import { URL_SERVICE } from "../utils/constant";

const http = axios.create({
  baseURL: URL_SERVICE,
  headers: {
    Authorization: `Bearer ${getStore('web-token')}`
  }
});

export default http;
