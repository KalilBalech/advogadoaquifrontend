import axios from "axios";

export default function putCustomerEmail(customerID, customerEmail){
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.BASE_URL;
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
    let reqData = { email: customerEmail };
    return axios
      .put(`${BASE_URL}/customer/${customerID}/`, reqData, {
        headers: headers,
      })
      .then((response) => {
        console.log("O Customer email do customer " + customerID + " FOI ATUALIZADO para ", customerEmail);
      })
      .catch((error) => {
        console.log("Ocorreu algum erro em putCustomerEmail: ", error);
        throw new Error("Ocorreu algum erro em putCustomerEmail");
      });
  };