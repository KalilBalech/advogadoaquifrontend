import axios from "axios";

export default function putTaskDescription(taskID, taskDescription){
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.BASE_URL;
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
    let nameData = { description: taskDescription };
    return axios
      .put(`${BASE_URL}/task/${taskID}/`, nameData, {
        headers: headers,
      })
      .then((response) => {
        console.log("O TASK DESCRIPTION FOI ATUALIZADO para ", taskDescription);
      })
      .catch((error) => {
        console.log("ERRO AO ATUALIZAR TASK DESCRIPTION", error);
        throw new Error("Ocorreu algum erro em updateTaskDescription");
      });
  };