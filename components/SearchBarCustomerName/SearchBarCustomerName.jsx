'use client'
import styles from './SearchBarCustomerName.module.css'
import Image from 'next/image'
import searchIcon from '@/public/searchIcon.svg'
import { useState, useEffect } from 'react';
import getCustomerByName from '@/utils/API/getCustomerByName'
import getLawyerCustomers from '@/utils/API/getLawyerCustomers'

export default function SearchBarCustomerName({setCustomers}){

    const [timer, setTimer] = useState(null);
    const [customerName, setCustomerName] = useState('')

    useEffect(() => {
        // Limpar o timer antigo antes de configurar um novo
        clearTimeout(timer);
        // Configurar um novo timer
        const newTimer = setTimeout(async() => {
            if (customerName){
                const cases = await getCustomerByName();
                setCustomers(cases)
            }
            else{
                const cases = await getLawyerCustomers();
                setCustomers(cases)
            }
        }, 500); // 1/2 segundo de atraso

        setTimer(newTimer);
        return () => clearTimeout(timer);
    }, [customerName]);

    return(
        <div className={styles.searchBarDiv}>
            <button className={styles.button}>
                <Image alt='search icon' src={searchIcon} width='25' height='25'></Image>
            </button>
            <input type="text" placeholder={'Nome do cliente'} className={styles.input} value={customerName} onChange={(e)=>setCustomerName(e.target.value)}/>
        </div>
    )
}