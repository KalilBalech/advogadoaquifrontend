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
    const [cases, setCases] = useState([])
    const [selectedCase, setSelectedCase] = useState(null)
    
    useEffect(() => {
    const token = localStorage.getItem("token");
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
            // PEGA OS PROCESSOS DO LAWYER
          axios
            .get(`${BASE_URL}/case/lawyer/`, {
              headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            })
            .then((response) => {
              console.log("response DOS PROCESSOS NA PAGINA DE PROCESSOS: ", response);
              setCases(response.data);
            })
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
        <SearchCaseBar></SearchCaseBar>
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
