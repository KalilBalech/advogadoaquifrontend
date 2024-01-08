"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import axios from "axios";
import AuthHeader from "@/components/AuthHeader/AuthHeader";

export default function Lawyer() {
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const token = localStorage.getItem("token");
  const lawyerID = localStorage.getItem("lawyerID");
  const [cases, setCases] = useState(null)
  
  const listCases = cases ? cases.map(case => // erro na api - ao fazer o get, nao retorna o sexo nem o birthDate
    <p>{case.number}</p>
  ) : <p>não há atletas</p>

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
    <body>
      <AuthHeader></AuthHeader>
      <h1>Seus processos de São Paulo</h1>;
      <ul>
        {cases.map(case => <li key={case.id}>{case.number}</li>)}
      </ul>
    </body>
  );
}
