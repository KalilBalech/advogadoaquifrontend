import styles from './SearchBar.module.css'
import Image from 'next/image'
import searchIcon from '@/public/searchIcon.svg'
import axios from 'axios'
import { useState, useEffect } from 'react';

export default function SearchBar({setModel, model}){

    const BASE_URL = process.env.BASE_URL;
    let FILTER_URL, GET_URL;
    if(model == 'case'){
        FILTER_URL = `${BASE_URL}/case/number`
        GET_URL = `${BASE_URL}/case/lawyer/`
    }
    else if(model == 'customer'){
        FILTER_URL = `${BASE_URL}/customer/nameStarts`
        GET_URL = `${BASE_URL}/customer/lawyer/`
    }

    const token = localStorage.getItem('token')
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
    const [caseNumberOrCustomerCase, setCaseNumberOrCustomerCase] = useState('')

    const [timer, setTimer] = useState(null);

    const filterCaseByNumberOrCustomerByName = () => {
        axios.get(`${FILTER_URL}/${caseNumberOrCustomerCase}/`, {headers: headers})
        .then(response=>{
            console.log("FILTROU OS MODELS COM SUCESSO IRRÁAAAAA: ", response)
            setModel(response.data)
        })
        .catch(error => console.log("Ocorreu algum erro ao filtrar processos pelo numero: ", error))
    };

    const getAllLawyerCasesOrCustomers = () => {
        axios
        .get(GET_URL, {headers: headers})
        .then((response) => {
            console.log("PEGOU TODOS OS CASOS")
            setModel(response.data);
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
            if (caseNumberOrCustomerCase){
                filterCaseByNumberOrCustomerByName();
            }
            else{
                getAllLawyerCasesOrCustomers()
            }
        }, 500); // 1/2 segundo de atraso

        setTimer(newTimer);

        // Função de limpeza que será chamada quando o componente for desmontado
        return () => clearTimeout(timer);
    }, [caseNumberOrCustomerCase]);

    const handleInput = (value) => {
        if(model == 'case'){
            setCaseNumberOrCustomerCase(value)
        }
        else if(model == 'customer'){
            const capitalizedText = value.replace(/\b(\w)/g, char => char.toUpperCase());
            setCaseNumberOrCustomerCase(capitalizedText)
        }
    }

    return(
        <div className={styles.searchBarDiv}>
            <button className={styles.button}>
                <Image alt='search icon' src={searchIcon} width='25' height='25'></Image>
            </button>
            <input type="text" placeholder={model == 'case' ? 'Número do processo' : 'Nome do cliente'} className={styles.input} value={caseNumberOrCustomerCase} onChange={(e)=>handleInput(e.target.value)}/>
        </div>
    )
}