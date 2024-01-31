import axios from "axios";

export default function putTaskTitle(taskID, taskTitle){
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.BASE_URL;
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
    let nameData = { title: taskTitle };
    return axios
      .put(`${BASE_URL}/task/${taskID}/`, nameData, {
        headers: headers,
      })
      .then((response) => {
        console.log("O TASK TITLE da task " + taskID + " FOI ATUALIZADO para ", taskTitle);
      })
      .catch((error) => {
        console.log("ERRO AO ATUALIZAR TASK TITLE", error);
        throw new Error("Ocorreu algum erro em updateTaskTitle");
      });
  };