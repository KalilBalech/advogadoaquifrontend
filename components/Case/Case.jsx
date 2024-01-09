"use client";
import styles from './Case.module.css'
import { useState, useEffect } from 'react';
import axios from 'axios'
import MyIcon from '../MyIcon/MyIcon';
import Button from '../Button/Button'

export default function Case(props){
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const [clicked, setClicked] = useState(false)
    const [isEditingMessage, setIsEditingMessage] = useState(false)
    const [isSendingMessageByWhatsApp, setIsSendingMessageByWhatsApp] = useState(false)
    const [message, setMessage] = useState(props.case.lastMessage)
    const [lawyerPhoneNumber, setLawyerPhoneNumber] = useState('')
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
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
              props.case.hasUpdate = false
            })
            .catch((error) => {
              console.log("Ocorreu algum erro na atualização do processo: ", error);
            });
    }
    useEffect(()=>{
        if(clicked){
            setTimeout(() => {
                setClicked(false)
            }, 3000);
        }
    }, [clicked])
    const handleBeginEditingMessage = ()=>{
        setIsEditingMessage(true)
    }
    const handlePutNewMessage = ()=>{
        setIsEditingMessage(false)
        const putReqData = {
            'lastMessage': message
        }
        if(message != props.case.lastMessage){
            axios
            .put(`${BASE_URL}/case/${props.case.id}/`, putReqData, {
              headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            })
            .then((response) => {
                console.log("LastMessage alterada com sucesso")
                console.log("response: ", response);
                props.case.lastMessage = message
            })
            .catch((error) => {
              console.log("Ocorreu algum erro na atualização da lastMessage: ", error);
            });
        }
    }
    const handleSendMessageByWhatsapp = () => {
        setIsSendingMessageByWhatsApp(!isSendingMessageByWhatsApp)
    }
    const sendWhatsAppMessage = () =>{
        window.open(`https://wa.me/${customerPhoneNumber}?text=${message}`, '_blank')
        setIsSendingMessageByWhatsApp(false)
    }
    return(
    <div className={styles.mainWindow}>
        <div key={props.case.id} className={styles.caseDiv}>
            <h2 className={styles.caseNumber}>{props.case.number}</h2>
            {props.case.hasUpdate && <>
                <p>PROCESSO COM NOVIDADES</p>
                <p>&#128521; Mensagem sugerida para o cliente: </p>
                {!isEditingMessage && <p className={styles.lastMessage}>{message}</p>}
                {isEditingMessage && <textarea autoFocus value={message} onChange={(event) => setMessage(event.target.value)} className={styles.textarea} rows='8' spellCheck="false"/>}
                <div className={styles.buttons}>
                    <div className={styles.sendMessageButtons}>
                        <MyIcon src='/whatsapp-icon.svg' alt='whatsapp icon' width='24' height='24' title='Enviar mensagem por WhatsApp' onClick={handleSendMessageByWhatsapp}></MyIcon>
                        <MyIcon src='/gmail-icon.svg' alt='whatsapp icon' width='24' height='24' title='Enviar mensagem por email'></MyIcon>
                    </div>
                    <div className={styles.editMessageButton}>
                    {!isEditingMessage && <MyIcon src='/edit-icon.svg' alt='whatsapp icon' width='24' height='24' title="Editar mensagem sugerida" onClick={handleBeginEditingMessage}></MyIcon>}
                    {isEditingMessage && <Button text='Alterar mensagem' onClick={handlePutNewMessage}></Button>}
                    </div>
                </div>
                {!clicked && <button className={styles.button} onClick={()=>setClicked(true)}>Marcar atualização do processo como visualizada?</button>}
                {clicked && <button className={styles.button} onClick={()=>handlePutHasUpdate()}>Confirmar?</button>}
            </>
            }
            {!props.case.hasUpdate && <>
                <p>&#128077; Sem atualização no último mês</p>
            </>
            }

        </div>
        {isSendingMessageByWhatsApp && <div className={styles.contactInfo}>
            <h2>Informações de contato!</h2>
            {/* <div className={styles.userBox}>
                <input
                type="text"
                value={lawyerPhoneNumber}
                onChange={(e) => setLawyerPhoneNumber(e.target.value)}
                required
                />
                <label>Seu whatsApp, Doutor</label>
            </div> */}
            <div className={styles.userBox}>
                <input
                type="text"
                value={customerPhoneNumber}
                onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                required
                />
                <label>Cliente não especificado. Qual o whatsApp dele?</label>
            </div>
            <p>{errorMessage}</p>
            <button type="submit" onClick={()=>{sendWhatsAppMessage()}}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Enviar
            </button>
        </div>
        }
    </div>
    )
}