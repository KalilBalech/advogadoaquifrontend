import axios from "axios"

export default function getCasesByNumber(caseNumber){
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.BASE_URL;
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
    return axios.get(`${BASE_URL}/case/number/${caseNumber}/`, {headers: headers})
    .then(response => {
        console.log("Pegou os cases com começam com o number " + caseNumber)
        return (response.data)
    })
    .catch(e=>{
        console.log("Ocorreu algum erro ao atulizar o getCasesByNumber: ", e)
        throw new Error("Ocorreu algum erro na função getCasesByNumber");
    })
}