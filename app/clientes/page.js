"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import axios from "axios";
import HeaderPersonal from "@/components/HeaderPersonal/HeaderPersonal";
import SearchBar from "@/components/SearchBar/SearchBar";
import CaseCard from "@/components/CaseCard/CaseCard";
import { useRouter } from "next/navigation";
import CaseDetails from "@/components/CaseDetails/CaseDetails";
import Customer from "@/components/Customer/Customer";


export default function LawyerCases() {
    const router = useRouter();
    const BASE_URL = process.env.BASE_URL;
    const token = localStorage.getItem('token')
    const [customers, setCustomers] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState(null)

    const headers = {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    }
    
    useEffect(() => {
    if (token) {
      const tokenReqData = { token };
      // VERIFICA SE A PESSOA TEM PERMISSAO DE ACESSO À PAGINA
      axios
        .post(`${BASE_URL}/lawyer/token/verify/`, tokenReqData, {headers: headers})
        .then(() => {
            // PEGA OS PROCESSOS DO LAWYER
          axios
            .get(`${BASE_URL}/customer/lawyer/`, {headers: headers})
            .then((response) => {setCustomers(response.data);})
            .catch((error) => {
              console.log("Ocorreu algum erro na busca de processos: ", error);
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
    <body className={`${styles.body} ${selectedCustomer!=null ? styles.blockScroll : ''}`}>
      <HeaderPersonal></HeaderPersonal>
      <div className={styles.content}>
        <SearchBar setModel={setCustomers} model='customer'></SearchBar>
        <ul>
            {customers.map((customer) => (
              <Customer key={customer.id} customer={customer} setSelectedCustomer={setSelectedCustomer}></Customer>
            ))}
        </ul>
        <CaseDetails selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer}></CaseDetails>
      </div>
    </body>
  );
}
