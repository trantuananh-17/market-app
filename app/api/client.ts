import axios from "axios";

const baseURL = "https://market-server-n0st.onrender.com";

const client = axios.create({ baseURL });

export default client;
