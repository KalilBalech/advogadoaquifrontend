"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from './page.module.css'
import axios from "axios";

export default function Lawyer(){
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const router = useRouter();
    useEffect(() => {
        if (localStorage.getItem("token")) {
          const tokenReqData = {
            'token': localStorage.getItem("token")
          }
          axios
          .post(`${BASE_URL}/lawyer/token/verify/`, tokenReqData, {
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            router.push("/lawyer");
          })
          .catch((error) => {
            console.log("Token inválido: ",error)
            router.push("/");
          });
        }
        else{
            router.push("/");
        }
      }, []);
    return(
        <h1>Lawyer Page</h1>
    )
}