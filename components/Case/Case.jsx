"use client";
import styles from './Case.module.css'
import { useState, useEffect } from 'react';
import axios from 'axios'
import MyIcon from '../MyIcon/MyIcon';
// import { useRouter } from 'next/router';

export default function Case(props){
    // const router = useRouter();
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const [clicked, setClicked] = useState(false)
    const handlePutHasUpdate = ()=>{
        const putReqData = {
            'hasUpdate': false
        }
        axios
            .put(`${BASE_URL}/case/${props.case.id}/`, putReqData, {
              headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            })
            .then((response) => {
              console.log("response: ", response);
            //   router.reload();
            })
            .catch((error) => {
              console.log("Ocorreu algum erro na atualização do processo: ", error);
            });
    }
    useEffect(()=>{
        if(clicked){
            setTimeout(() => {
                // Coloque aqui a ação que você quer executar após 3 segundos
                setClicked(false)
            }, 3000);
        }
    }, [clicked])
    return(
        <div key={props.case.id} className={styles.caseDiv}>
            <h2>{props.key} - {props.case.number}</h2>
            {props.case.hasUpdate && <>
                <p>PROCESSO ATUALIZADO</p>
                <p>Mensagem sugerida para o cliente: </p>
                <p>{props.case.lastMessage}</p>
                <div className={styles.buttons}>
                    <div className={styles.sendMessageButtons}>
                        <MyIcon src='/whatsapp-icon.svg' alt='whatsapp icon' width='24' height='24'></MyIcon>
                        <MyIcon src='/gmail-icon.svg' alt='whatsapp icon' width='24' height='24'></MyIcon>
                    </div>
                    <div className={styles.editMessageButton}>
                        <MyIcon src='/edit-icon.svg' alt='whatsapp icon' width='24' height='24'></MyIcon>
                    </div>
                </div>
                {!clicked && <button className={styles.button} onClick={()=>setClicked(true)}>Marcar atualização do processo como visualizada?</button>}
                {clicked && <button className={styles.button} onClick={()=>handlePutHasUpdate()}>Confirmar?</button>}
            </>
            }
        </div>
    )
}