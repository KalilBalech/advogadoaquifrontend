import axios from "axios";

export default function updateCaseLastTrackedFile(caseID, caseLastTrackedFile){
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.BASE_URL;
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
    let lastTrackedFile = {lastTrackedFile: caseLastTrackedFile}
    return axios.put(`${BASE_URL}/case/${caseID}/`, lastTrackedFile, {headers: headers}) // atualizou o model do backend
    .then((response) => {
        console.log("O CASE LAST TRACKED FILE ATUALIZADO", caseLastTrackedFile)
        console.log("response: ", response);
    })
    .catch((error) => {
        console.log("ERRO AO ATUALIZAR CASE LAST TRACKED FILE", error);
        throw new Error("Ocorreu algum erro em updateCaseLastTrackedFile");
    });
}