import axios from "axios";
import decodeToken from "@/utils/decodeToken";

export default function putTaskResponsibleLawyer(taskID, lawyerID = decodeToken(localStorage.getItem('token'))){
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.BASE_URL;
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
    let emptyReqData = {};
    return axios
      .put(`${BASE_URL}/task/${taskID}/responsibleLawyer/${lawyerID}/`, emptyReqData, {
        headers: headers,
      })
      .then((response) => {
        console.log("O TASK RESPONSIBLE LAWYER FOI ALTERADO COM SUCESSO ", response);
      })
      .catch((error) => {
        console.log("ERRO AO ATUALIZAR TASK RESPONSIBLE LAWYER", error);
        throw new Error("Ocorreu algum erro em putTaskResponsibleLawyer");
      });
}