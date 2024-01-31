import axios from "axios";

export default function putCaseAnnotation(caseID, caseAnnotation){
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.BASE_URL;
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
    let annotationData = {annotation: caseAnnotation}
    return axios.put(`${BASE_URL}/case/${caseID}/`, annotationData, {headers: headers})
    .then((response) => {
        console.log("O CASE ANNOTATION FOI ATUALIZADO para ", caseAnnotation)
        console.log("response: ", response);
    })
    .catch((error) => {
        console.log("ERRO AO ATUALIZAR CASE ANNOTATION", error);
        throw new Error("Ocorreu algum erro em putCaseAnnotation");
    });
}