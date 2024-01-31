import axios from "axios";

export default function putTaskDeadline(taskID, dataBaseDeadlineValue) {
  const token = localStorage.getItem("token");
  const BASE_URL = process.env.BASE_URL;
  const headers = {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
  let taskDeadlineData = { deadline: dataBaseDeadlineValue };
  return axios
    .put(`${BASE_URL}/task/${taskID}/`, taskDeadlineData, {
      headers: headers,
    })
    .then((response) => {
      console.log(
        "O TASK DEADLINE FOI ATUALIZADO para ",
        dataBaseDeadlineValue
      );
    })
    .catch((error) => {
      console.log("ERRO AO ATUALIZAR TASK DEADLINE", error);
      throw new Error("Ocorreu algum erro em putTaskDeadline");
    });
}
