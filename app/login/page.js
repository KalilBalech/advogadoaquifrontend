"use client";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/Header/Header";

export default function Login() {
  const router = useRouter();

  const BASE_URL = process.env.BASE_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log("BASE URL: " + BASE_URL)
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
        router.push("/processos");
      })
      .catch((error) => {
        console.log("Token inválido: ",error)
      });
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    const requestData = {
      email: email.toLowerCase(),
      password,
    };
    axios
      .post(`${BASE_URL}/lawyer/login/`, requestData, {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const token = response.data.access;
        const base64Payload = token.split(".")[1];
        const payload = atob(base64Payload);
        const payloadObject = JSON.parse(payload);
        const lawyerID = payloadObject.user_id;

        localStorage.setItem("token", token);
        localStorage.setItem("lawyerID", lawyerID);
        localStorage.removeItem("personalID");

        router.push("/processos");
      })
      .catch((error) => {
        if (error.response == undefined) {
          setErrorMessage("Parece que nosso servidor está fora do ar...");
        } else {
          const statusCode = error.response.status;
          if (statusCode == 401) {
            setErrorMessage("Email ou senha inválidos");
          }
        }
      });
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
    </body>
  );
}
