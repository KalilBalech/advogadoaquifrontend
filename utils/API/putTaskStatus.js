import axios from "axios";

export default function putTaskStatus(task){
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.BASE_URL;
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
    let newStatus;
    if(task.status == 'TODO'){
        newStatus = {
            status: 'DOING'
        }
    }
    else if(task.status == 'DOING'){
        newStatus = {
            status: 'DONE'
        }
    }
    return axios.put(`${BASE_URL}/task/${task.id}/`,newStatus, {headers})
    .then((response) => {
        console.log(`STATUS ALTERADO COM SUCESSO TASK: ${task.id}: `, response)
    })
    .catch(e=>{
        console.log("Ocorreu algum erro ao ALTERAR STATUS DA task: ", e)
        throw new Error("Ocorreu algum erro em putTaskStatus");
    })
}