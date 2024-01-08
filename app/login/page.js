"use client";
import styles from "./login.module.css";
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";
import axios from "axios";

export default function Login() {
    const router = useRouter()

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    const requestData = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/lawyer/login/`,
        requestData,
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );
    // console.log("CHEGOU AQUIIIII")
    //   if (response.status === 200 || response.status === 201) {
        const token = response.data.access;
        const base64Payload = token.split(".")[1];
        const payload = atob(base64Payload);
        const payloadObject = JSON.parse(payload);
        const lawyerID = payloadObject.user_id;

        localStorage.setItem("token", token);
        localStorage.setItem("lawyerID", lawyerID);
        localStorage.removeItem("personalID");

        router.push('/lawyer')

    //   } else {
    //     console.log(reponse);
    //     setErrorMessage("Não há nenhuma conta ativa com essas credenciais");
    //   }
    } catch (error) {
      setErrorMessage("Email ou senha inválidos");
    }
  };

  return (
    <div className={styles.loginBox}>
      <h2>Bem-vindo de volta, Doutor!</h2>
      <form onSubmit={handleLogin}>
        <div className={styles.userBox}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
  );
}
