import styles from './SearchCaseBar.module.css'
import Image from 'next/image'
import searchIcon from '@/public/searchIcon.svg'
import axios from 'axios'
import { useState, useEffect } from 'react';

export default function SearchCaseBar({setCases}){
    const BASE_URL = process.env.BASE_URL;
    const token = localStorage.getItem('token')
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
    const [number, setNumber] = useState('')

    const [timer, setTimer] = useState(null);

    const filterCaseByNumber = () => {
        // Substitua pela sua URL de API e lógica de chamada
        axios.get(`${BASE_URL}/case/number/${number}/`, {headers: headers})
        .then(response=>{
            console.log("FILTROU OS CASOS COM SUCESSO IRRÁAAAAA")
            setCases(response.data)
        })
        .catch(error => console.log("Ocorreu algum erro ao filtrar processos pelo numero: ", error))
    };

    const getAllLawyerCases = () => {
        axios
        .get(`${BASE_URL}/case/lawyer/`, {headers: headers})
        .then((response) => {
            console.log("PEGOU TODOS OS CASOS")
            setCases(response.data);
        })
        .catch((error) => {
          console.log("Ocorreu algum erro na busca de processos: ", error);
        });
    }

    useEffect(() => {
        // Limpar o timer antigo antes de configurar um novo
        clearTimeout(timer);

        // Configurar um novo timer
        const newTimer = setTimeout(() => {
            if (number){
                filterCaseByNumber();
            }
            else{
                getAllLawyerCases()
            }
        }, 500); // 1/2 segundo de atraso

        setTimer(newTimer);

        // Função de limpeza que será chamada quando o componente for desmontado
        return () => clearTimeout(timer);
    }, [number]);

    // const filterCasesByNumber = (newNumber)=>{
    //     if(newNumber != ''){
    //         axios.get(`${BASE_URL}/case/number/${newNumber}/`, {headers: headers})
    //         .then(response=>{
    //             setCases(response.data)
    //             setNumber(newNumber)
    //         })
    //         .catch(error => console.log("Ocorreu algum erro ao filtrar processos pelo numero: ", error))
    //     }
    // }
    return(
        <div className={styles.searchBarDiv}>
            <button className={styles.button}>
                <Image alt='search icon' src={searchIcon} width='25' height='25'></Image>
            </button>
            <input type="text" placeholder='Número do processo' className={styles.input} value={number} onChange={(e)=>setNumber(e.target.value)}/>
        </div>
    )
}