import axios from "axios"

export default function deleteTask(taskID){
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.BASE_URL;
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
    return axios.delete(`${BASE_URL}/task/${taskID}/`, {headers})
        .then((response)=>{
            console.log(`Task deleted successfully ${taskID}: ${response}`)
        })
        .catch((error)=>{console.log(`Some error occurred while deleting task ${taskID}: `, error)})
}