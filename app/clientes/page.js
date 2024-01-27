"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import axios from "axios";
import HeaderPersonal from "@/components/HeaderPersonal/HeaderPersonal";
import SearchCaseBar from "@/components/SearchCaseBar/SearchCaseBar";
import Customer from "@/components/Customer/Customer";
import { useRouter } from "next/navigation";


export default function LawyerCases() {
    const router = useRouter();
    const BASE_URL = process.env.BASE_URL;
    const [customers, setCustomers] = useState([])
    const [lawyer, setLawyer] = useState(null)
    
    useEffect(() => {
    const token = localStorage.getItem("token");
    const lawyerID = localStorage.getItem("lawyerID");
    if (localStorage.getItem("token")) {
      const tokenReqData = { token };
      // VERIFICA SE A PESSOA TEM PERMISSAO DE ACESSO À PAGINA
      axios
        .post(`${BASE_URL}/lawyer/token/verify/`, tokenReqData, {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // PEGAR AS INFORMAÇÕES PESSOAIS DO LAWYER
          axios
            .get(`${BASE_URL}/lawyer/${lawyerID}/`, {
              headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            })
            .then((response) => {
              console.log("As informações pessoais do advogado foram pegas NA PAGINA DE CLIENTES")
              console.log("response: ", response);
              setLawyer(response.data)
            })
            .catch((error) => {
              console.log("Ocorreu algum erro na busca das informações pessoais do advogado: ", error);
            });
          
            // PEGA OS CLIENTES DO LAWYER
          axios
            .get(`${BASE_URL}/customer/lawyer/`, {
              headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            })
            .then((response) => {
              console.log("response DOS CUSTOMERS NA PAGINA DE CLIENTES: ", response);
              setCustomers(response.data);
            })
            .catch((error) => {
              console.log("Ocorreu algum erro na busca de CLIENTES: ", error);
            });
        })
        .catch((error) => {
          console.log("Token inválido: ", error);
          router.push("/");
        });
    } else {
      router.push("/");
    }
  }, []);
  return (
  <>
    <body>
      <HeaderPersonal></HeaderPersonal>
      <div className={styles.content}>
        <SearchCaseBar></SearchCaseBar>
        <ul>
            {customers.map((customer) => (
                // <li key={caseItem.id}>{caseItem.number}</li>
                <Customer key={customer.id} customer={customer} lawyer={lawyer}></Customer>
                ))}
        </ul>
      </div>
    </body>
    </>
  );
}
