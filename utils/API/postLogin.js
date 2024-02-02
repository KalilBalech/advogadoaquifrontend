import axios from "axios";

export default function postLogin(email, password){
    const BASE_URL = process.env.BASE_URL;
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
    }
    const requestData = {
        email,
        password,
      };
    return axios.post(`${BASE_URL}/lawyer/login/`, requestData, {headers: headers})
        .then((response) => {
          const token = response.data.access;  
          localStorage.setItem("token", token);
          return response.data
        })
        .catch((error) => {
            return error
        });
}