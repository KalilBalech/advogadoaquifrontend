import axios from "axios";

export default function getLawyerCases(){
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.BASE_URL;
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
    
    return axios
    .get(`${BASE_URL}/case/lawyer/`, {headers: headers})
    .then((response) => {
        console.log("Lawyer cases got successfully: ", response)
        return response.data;
    })
    .catch((error) => {
        console.log("Ocorreu algum erro em getLawyerCases: ", error);
        throw new Error("Ocorreu algum erro em getLawyerCases");
    });
}