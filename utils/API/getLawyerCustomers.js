import axios from "axios";

export default function getLawyerCustomers(){
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.BASE_URL;
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
    
    return axios
    .get(`${BASE_URL}/customer/lawyer/`, {headers: headers})
    .then((response) => {
        console.log("Lawyer customers got successfully: ", response)
        return response.data;
    })
    .catch((error) => {
        console.log("Ocorreu algum erro em getLawyerCustomers: ", error);
        throw new Error("Ocorreu algum erro em getLawyerCustomers");
    });
}