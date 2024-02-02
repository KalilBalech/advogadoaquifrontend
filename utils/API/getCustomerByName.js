import axios from "axios"

export default function getCustomerByName(customerName){
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.BASE_URL;
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
    return axios.get(`${BASE_URL}/customer/nameStarts/${customerName}/`, {headers: headers})
    .then(response => {
        console.log("Pegou os customer com começam com o nome " + customerName)
        return (response.data)
    })
    .catch(e=>{
        console.log("Ocorreu algum erro ao atulizar o getCustomerByName: ", e)
        throw new Error("Ocorreu algum erro na função getCustomerByName");
    })
}