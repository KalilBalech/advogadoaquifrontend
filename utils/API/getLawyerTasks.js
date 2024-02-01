import axios from "axios";

export default function getLawyerTasks(){
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.BASE_URL;
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
    
    return axios
    .get(`${BASE_URL}/task/lawyer/`, {headers: headers})
    .then((response) => {
        console.log("Lawyer tasks got successfully: ", response)
        return response.data;
    })
    .catch((error) => {
        console.log("Ocorreu algum erro em getLawyerTasks: ", error);
        throw new Error("Ocorreu algum erro em getLawyerTasks");
    });
}