import axios from "axios"

export default function getCaseTasks(caseID){
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.BASE_URL;
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
    return axios.get(`${BASE_URL}/task/case/${caseID}/`, {headers: headers})
    .then(response => {
        console.log("Pegou as tasks do case " + caseID + "com sucesso: ", response)
        return (response.data)
    })
    .catch(e=>{
        console.log("Ocorreu algum erro ao atulizar o caseTasks: ", e)
        throw new Error("Ocorreu algum erro na função getCaseTasks");
    })
}