import axios from "axios";

export default function updateCaseSuggestedMessage(caseID, caseSuggestedMessage){
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.BASE_URL;
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
    let suggestedMessageData = {suggestedMessage: caseSuggestedMessage}
    return axios.put(`${BASE_URL}/case/${caseID}/`, suggestedMessageData, {headers: headers})
    .then((response) => {
        console.log("O CASE SUGGESTED MESSAGE ATUALIZADO: ", caseSuggestedMessage)
        console.log("response: ", response);
    })
    .catch((error) => {
        console.log("ERRO AO ATUALIZAR CASE SUGGESTED MESSAGE", error);
        throw new Error("Ocorreu algum erro em updateCaseSuggestedMessage");
    });
}