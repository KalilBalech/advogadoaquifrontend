import axios from "axios";

export default function updateCaseName(caseID, caseName){
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.BASE_URL;
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
    const nameData = {name: caseName}
    return axios.put(`${BASE_URL}/case/${caseID}/`, nameData, {headers: headers})
    .then((response) => {
        console.log("O CASE NAME FOI ATUALIZADO para ", caseName)
        console.log("response: ", response);
    })
    .catch((error) => {
        console.log("ERRO AO ATUALIZAR CASE NAME", error);
        throw new Error("Ocorreu algum erro em updateCaseName");
    });
}