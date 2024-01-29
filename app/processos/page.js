"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import axios from "axios";
import HeaderPersonal from "@/components/HeaderPersonal/HeaderPersonal";
import SearchCaseBar from "@/components/SearchCaseBar/SearchCaseBar";
import Case from "@/components/Case/Case";
import { useRouter } from "next/navigation";
import RollingCard from "@/components/RollingCard/RollingCard";


export default function LawyerCases() {
    const router = useRouter();
    const BASE_URL = process.env.BASE_URL;
    const token = localStorage.getItem('token')
    const [cases, setCases] = useState([])
    const [selectedCase, setSelectedCase] = useState(null)

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
        .then((response) => {
            // PEGA OS PROCESSOS DO LAWYER
          axios
            .get(`${BASE_URL}/case/lawyer/`, {headers: headers})
            .then((response) => {setCases(response.data);})
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
  <>
    <body className={`${styles.body} ${selectedCase!=null ? styles.blockScroll : ''}`}>
      <HeaderPersonal></HeaderPersonal>
      <div className={styles.content}>
        <SearchCaseBar setCases={setCases}></SearchCaseBar>
        <ul>
            {cases.map((caseItem) => (
                // <li key={caseItem.id}>{caseItem.number}</li>
                <Case key={caseItem.id} case={caseItem} setSelectedCase={setSelectedCase}></Case>
                ))}
        </ul>
        <RollingCard selectedCase={selectedCase} setSelectedCase={setSelectedCase}></RollingCard>
      </div>
    </body>
    </>
  );
}
