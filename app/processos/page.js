"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import axios from "axios";
import HeaderPersonal from "@/components/HeaderPersonal/HeaderPersonal";
import SearchBar from "@/components/SearchBar/SearchBar";
import CaseCard from "@/components/CaseCard/CaseCard";
import { useRouter } from "next/navigation";
import CaseDetailsSideCard from "@/components/CaseDetailsSideCard/CaseDetailsSideCard";
import getLawyerCases from "@/utils/API/getLawyerCases";
import verifyToken from "@/utils/API/verifyToken";

export default function LawyerCases() {
    const router = useRouter();
    const [cases, setCases] = useState([])
    const [selectedCase, setSelectedCase] = useState(null)
    
    // ATUALIZA A ARVORE DE INFORMAÇÕES NO FRONT
    useEffect(()=>{
      if (selectedCase) {
        console.log("O SelectedCase atualizado: ", selectedCase)
        const updatedCases = cases.map(caseItem => 
          caseItem.id === selectedCase.id ? selectedCase : caseItem
        );
        setCases(updatedCases);
        console.log("O CASES foi alterado porque o selectedCAse foi alterado: ", cases)
      }
  
    }, [selectedCase])
    
    useEffect(() => {
      async function verifyTokenAndGetCases() {
        try {
            await verifyToken();
            const lawyerCases = await getLawyerCases();
            setCases(lawyerCases);
        } catch (error) {
            // Qualquer erro em verifyToken ou getLawyerCases será tratado aqui
            console.error("Error: ", error);
            router.push("/"); // Redirecionar ou tratar o erro conforme necessário
        }
    }
    verifyTokenAndGetCases();
    }, []);

  return (
    <body className={`${styles.body} ${selectedCase!=null ? styles.blockScroll : ''}`}>
      <HeaderPersonal></HeaderPersonal>
      <div className={styles.content}>
        <SearchBar setModel={setCases} model='case'></SearchBar>
        <ul>
            {cases.map((caseItem) => (
              <CaseCard key={caseItem.id} case={caseItem} setSelectedCase={setSelectedCase}></CaseCard>
            ))}
        </ul>
        <CaseDetailsSideCard selectedCase={selectedCase} setSelectedCase={setSelectedCase}></CaseDetailsSideCard>
      </div>
    </body>
  );
}
