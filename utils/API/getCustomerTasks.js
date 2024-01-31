import axios from "axios"

export default function getCustomerTasks(customerID){
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.BASE_URL;
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
    return axios.get(`${BASE_URL}/task/customer/${customerID}/`, {headers: headers})
    .then(response => {
        console.log("Pegou as tasks do customer " + customerID + "com sucesso: ", response)
        return (response.data)
    })
    .catch(e=>{
        console.log("Ocorreu algum erro na função getCustomerTasks: ", e)
        throw new Error("Ocorreu algum erro na função getCustomerTasks");
    })
}