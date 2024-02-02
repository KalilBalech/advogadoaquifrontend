import axios from "axios";

export default function verifyToken(){
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.BASE_URL;
    const tokenReqData = { token };

    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }

    return axios
    .post(`${BASE_URL}/lawyer/token/verify/`, tokenReqData, {headers: headers})
    .then(() => {
        console.log("Token verified!")
    })
    .catch((error) => {
        console.log("Invalid Token: ", error);
        throw new Error("Token verification failed");
      });
}