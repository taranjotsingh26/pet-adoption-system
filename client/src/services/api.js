import axios from "axios";

const API = axios.create({
  baseURL: "https://pet-adoption-system-vpqq.onrender.com/api"
});

export default API;