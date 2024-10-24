import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://itder.com/api", // Update the base URL here
});

const useAxiosPublic = () => {
  return axiosInstance;
};

export default useAxiosPublic;
