"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import axios from "axios";
import AuthHeader from "@/components/AuthHeader/AuthHeader";
import Case from "@/components/Case/Case";
import { useRouter } from "next/navigation";


export default function Lawyer() {
    const router = useRouter();
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const token = localStorage.getItem("token");
  const lawyerID = localStorage.getItem("lawyerID");
  const [cases, setCases] = useState([])

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const tokenReqData = { token };
      axios
        .post(`${BASE_URL}/lawyer/token/verify/`, tokenReqData, {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          axios
            .get(`${BASE_URL}/case/lawyer/${lawyerID}/`, {
              headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            })
            .then((response) => {
              console.log("response: ", response);
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
    <body>
      <AuthHeader></AuthHeader>
      <div className={styles.mainWindow}>
        <h1>Seus processos de São Paulo ({cases.length})</h1>
        <ul>
            {cases.map((caseItem) => (
                // <li key={caseItem.id}>{caseItem.number}</li>
                <Case key={caseItem.id} case={caseItem}></Case>
                ))}
        </ul>
      </div>
    </body>
    </>
  );
}
