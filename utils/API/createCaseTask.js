import axios from "axios";

export default function createCaseTask(caseID){
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.BASE_URL;
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
    let createTaskData = {
        title: 'Nova Tarefa',
        description: 'Descrição',
    }
    return axios.post(`${BASE_URL}/task/case/${caseID}/`, createTaskData, {headers: headers})
    .then((response) => {
        console.log("Task criada com sucesso")
        let taskID = response.data.id
        return taskID
    })
    .catch(error => {
        console.log("Ocorreu algum erro ao criar task: ", error)
        throw new Error("Ocorreu algum erro ao criar task");
    })
}