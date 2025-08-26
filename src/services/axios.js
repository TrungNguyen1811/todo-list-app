import axios from "axios";
import qs from "qs";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API,
  paramsSerializer: (params) =>
    qs.stringify(params, {
      arrayFormat: "repeat",
      skipNulls: true,
    }),
});

export default instance;
