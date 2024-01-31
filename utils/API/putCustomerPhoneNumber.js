import axios from "axios";

export default function putCustomerPhoneNumber(customerID, customerPhoneNumber){
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.BASE_URL;
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
    let reqData = { phoneNumber: customerPhoneNumber };
    return axios
      .put(`${BASE_URL}/customer/${customerID}/`, reqData, {
        headers: headers,
      })
      .then((response) => {
        console.log("O Customer Name do customer " + customerID + " FOI ATUALIZADO para ", customerPhoneNumber);
      })
      .catch((error) => {
        console.log("Ocorreu algum erro em putCustomerPhoneNumber: ", error);
        throw new Error("Ocorreu algum erro em putCustomerPhoneNumber");
      });
  };