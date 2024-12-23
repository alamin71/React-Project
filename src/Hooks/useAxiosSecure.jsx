import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://itder.com/api",
});

const useAxiosSecure = () => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export default useAxiosSecure;

// (config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers["Authorization"] = "Bearer " + token;
//   }
//   return config;
// },
// (error) => {
//   Promise.reject(error);
// }
