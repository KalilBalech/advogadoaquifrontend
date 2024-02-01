import axios from "axios";

export default function putCaseAddLawyer(caseID, lawyerID){
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.BASE_URL;
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
    const reqData = {}
    return axios.put(`${BASE_URL}/case/${caseID}/lawyer/${lawyerID}/`, reqData, {headers: headers})
    .then((response) => {
        console.log(`O LAWYER ${lawyerID} FOI ADICIONA AO PROCESSO ${caseID}`)
        console.log("response: ", response);
    })
    .catch((error) => {
        console.log("Ocorreu algum erro em putCaseAddLawyer: ", error);
        throw new Error("Ocorreu algum erro em putCaseAddLawyer");
    });
}