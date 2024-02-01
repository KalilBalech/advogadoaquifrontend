import axios from "axios";

export default function getLawyerByEmail(email){
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.BASE_URL;
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
    
    return axios
    .get(`${BASE_URL}/lawyer/email/${email}/`, {headers: headers})
    .then((response) => {
        console.log("Lawyer cases got successfully: ", response)
        return response.data;
    })
    .catch((error) => {
        console.log("Ocorreu algum erro em getLawyerByEmail: ", error);
        throw new Error("Ocorreu algum erro em getLawyerByEmail");
    });
}