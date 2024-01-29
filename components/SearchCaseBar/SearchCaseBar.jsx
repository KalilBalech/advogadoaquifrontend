import styles from './SearchCaseBar.module.css'
import Image from 'next/image'
import searchIcon from '@/public/searchIcon.svg'
import axios from 'axios'

export default function SearchCaseBar({setCases}){
    const BASE_URL = process.env.BASE_URL;
    const token = localStorage.getItem('token')
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
    const filterCasesByNumber = (number)=>{
        if(number != ''){
            axios.get(`${BASE_URL}/case/number/${number}/`, {headers: headers})
            .then(response=>setCases(response.data))
            .catch(error => console.log("Ocorreu algum erro ao filtrar processos pelo numero: ", error))
        }
    }
    return(
        <div className={styles.searchBarDiv}>
            <button className={styles.button}>
                <Image alt='search icon' src={searchIcon} width='25' height='25'></Image>
            </button>
            <input type="text" placeholder='Número do processo' className={styles.input} onChange={(e)=>filterCasesByNumber(e.target.value)}/>
        </div>
    )
}