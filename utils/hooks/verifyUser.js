import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const useAuth = () => {
  const router = useRouter();
  const BASE_URL = process.env.BASE_URL;
  useEffect(() => {
    console.log("BASE URL: " + BASE_URL);
    const token = localStorage.getItem("token");
    if (token) {
      const tokenReqData = { 'token': token };
      axios
        .post(`${BASE_URL}/lawyer/token/verify/`, tokenReqData, {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        })
        .then(() => {
            // AUTORIZADO - TOKEN VÁLIDO
        })
        .catch((error) => {
            // NÃO AUTORIZADO - TOKEN INVÁLIDO
          console.log("Token inválido: ", error);
          // Você pode querer redirecionar para a página de login aqui
          router.push('/login');
        });
    }
  }); // Dependências do useEffect

  // ... você pode retornar qualquer coisa que seja necessária fora deste hook
};

export default useAuth;
