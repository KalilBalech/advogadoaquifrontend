'use client'
import styles from './SearchBarCaseNumber.module.css'
import Image from 'next/image'
import searchIcon from '@/public/searchIcon.svg'
import { useState, useEffect } from 'react';
import getCasesByNumber from '@/utils/API/getCasesByNumber'
import getLawyerCases from '@/utils/API/getLawyerCases'

export default function SearchBarCaseNumber({setCases}){

    const [timer, setTimer] = useState(null);
    const [caseNumber, setCaseNumber] = useState('')

    useEffect(() => {
        // Limpar o timer antigo antes de configurar um novo
        clearTimeout(timer);
        // Configurar um novo timer
        const newTimer = setTimeout(async() => {
            if (caseNumber){
                const cases = await getCasesByNumber();
                setCases(cases)
            }
            else{
                const cases = await getLawyerCases();
                setCases(cases)
            }
        }, 500); // 1/2 segundo de atraso

        setTimer(newTimer);
        return () => clearTimeout(timer);
    }, [caseNumber]);

    return(
        <div className={styles.searchBarDiv}>
            <button className={styles.button}>
                <Image alt='search icon' src={searchIcon} width='25' height='25'></Image>
            </button>
            <input type="text" placeholder={'Número do processo'} className={styles.input} value={caseNumber} onChange={(e)=>setCaseNumber(e.target.value)}/>
        </div>
    )
}