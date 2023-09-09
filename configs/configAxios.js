import { toast } from "react-toastify";

const BASE_API_URL = "https://speechdc.ir/";

const onRequest = (config) => {
  const newConfig = { ...config };

  newConfig.baseURL = BASE_API_URL;
  newConfig.headers["Content-Type"] = "application/json";
  newConfig.headers["Access-Control-Allow-Origin"] = "*";
  // newConfig.headers["Access-Control-Request-Method"] = "*";
  newConfig.headers["Access-Control-Allow-Methods"] = "*";
  newConfig.headers["Access-Control-Allow-Headers"] = "*";

  return newConfig;
};

const onRequestError = (error) => {
  return Promise.reject(error);
};

const onResponse = (response) => {
  return response?.data;
};

const onResponseError = async (error) => {
  const realError = error.response?.data;
  console.log("config axios error: ", error);

  toast.error(realError?.data?.message || error.message);
  return Promise.reject(realError || error);
};

export const setupInterceptorsTo = (axiosInstance) => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};
