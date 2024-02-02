"use client"
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/Header/Header";
import verifyToken from "@/utils/API/verifyToken";
import postLogin from "@/utils/API/postLogin";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function verifyTokenAndGoToCustomers() {
      try {
          await verifyToken();
          router.push("/clientes");
      } catch (error) {
          // Qualquer erro em verifyToken ou getLawyerCases será tratado aqui
          console.error("Necessário login: ", error);
      }
    }
    verifyTokenAndGoToCustomers();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try{
      await postLogin(email, password)
      router.push("/clientes");
    } 
    catch (error){
      setErrorMessage("Email ou senha inválidos");
    }
  };

  return (
    <body>
      <Header></Header>
      <div className={styles.loginBox}>
        <h2>Bem-vindo de volta, Doutor!</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.userBox}>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              required
            />
            <label>Email</label>
          </div>
          <div className={styles.userBox}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Senha</label>
          </div>
          <p>{errorMessage}</p>
          <button type="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Entrar
          </button>
        </form>
      </div>
    </body>
  );
}
