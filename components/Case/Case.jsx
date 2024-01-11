"use client";
import styles from './Case.module.css'
import { useState, useEffect } from 'react';
import axios from 'axios'
import MyIcon from '../MyIcon/MyIcon';
import Button from '../Button/Button'
import Loading from '../Loading/Loading'

export default function Case(props){
    const token = localStorage.getItem('token')
    const BASE_URL = process.env.BASE_URL;
    const [clicked, setClicked] = useState(false)
    const [isEditingMessage, setIsEditingMessage] = useState(false)
    const [sendMessageByWhatsappWindow, setSendMessageByWhatsappWindow] = useState(false)
    const [sendMessageByEmailWindow, setSendMessageByEmailWindow] = useState(false)
    const [message, setMessage] = useState(props.case.lastMessage)
    const [caseURL, setCaseURL] = useState('')
    const [redirectToCaseURLWindow, setRedirectToCaseURLWindow] = useState(false)
    const [isLoadingURL, setIsLoadingURL] = useState(false)
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState('')
    const [lawyerEmailAuth, setLawyerEmailAuth] = useState('')
    const [customerEmail, setCustomerEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const handlePutHasUpdate = ()=>{
        setSendMessageByWhatsappWindow(false)
        props.case.hasUpdate = false

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
            })
            .catch((error) => {
              console.log("Ocorreu algum erro na atualização do processo: ", error);
              props.case.hasUpdate = true
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
    const handleWhatsappIconClick = () => {
        setSendMessageByWhatsappWindow(!sendMessageByWhatsappWindow)
        setSendMessageByEmailWindow(false)
        setRedirectToCaseURLWindow(false)
    }
    const handleEmailIconClick = () => {
        setSendMessageByWhatsappWindow(false)
        setSendMessageByEmailWindow(!sendMessageByEmailWindow)
        setRedirectToCaseURLWindow(false)
    }
    const sendWhatsAppMessage = () =>{
        window.open(`https://wa.me/${customerPhoneNumber}?text=${message}`, '_blank')
        setSendMessageByWhatsappWindow(false)
    }
    const sendEmailMessage = () =>{
        
    }
    const returnCasePage = ()=>{
        if(caseURL == ''){
                setIsLoadingURL(true)
                setSendMessageByWhatsappWindow(false)
                axios.get(`${BASE_URL}/case/${props.case.id}/url/`, {headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            }})
            .then(response =>{
                setCaseURL(response.data)
                setIsLoadingURL(false)
                setRedirectToCaseURLWindow(true)
                setSendMessageByWhatsappWindow(false)
                setSendMessageByEmailWindow(false)
            })
            .catch(error=>{
                console.log("error: ", error)
            })
        }
        else{
            setRedirectToCaseURLWindow(true)
            setSendMessageByWhatsappWindow(false)
            setSendMessageByEmailWindow(false)
        }
    }
    const closeAllCards = () =>{
        setRedirectToCaseURLWindow(false)
        setSendMessageByWhatsappWindow(false)
        setSendMessageByEmailWindow(false)
    }
    return(
    <div className={styles.mainWindow}>
        <div key={props.case.id} className={styles.caseDiv}>
            <div className={styles.caseNumberDiv}><button className={styles.caseNumberButton} onClick={()=>{returnCasePage()}}>{props.case.number}</button>
                {isLoadingURL && <Loading></Loading>}
            </div>
            {props.case.hasUpdate && <>
                <p>PROCESSO COM NOVIDADES</p>
                <p>&#128521; Mensagem sugerida para o cliente: </p>
                {!isEditingMessage && <p className={styles.lastMessage}>{message}</p>}
                {isEditingMessage && <textarea autoFocus value={message} onChange={(event) => setMessage(event.target.value)} className={styles.textarea} rows='10' cols='60' spellCheck="false"/>}
                <div className={styles.buttons}>
                    <div className={styles.sendMessageButtons}>
                        <MyIcon src='/whatsapp-icon.svg' alt='whatsapp icon' width='24' height='24' title='Enviar mensagem por WhatsApp' onClick={handleWhatsappIconClick}></MyIcon>
                        <MyIcon src='/gmail-icon.svg' alt='whatsapp icon' width='24' height='24' title='Enviar mensagem por email' onClick={handleEmailIconClick}></MyIcon>
                    </div>
                    <div className={styles.editMessageButton}>
                    {!isEditingMessage && <MyIcon src='/edit-icon.svg' alt='whatsapp icon' width='24' height='24' title="Editar mensagem sugerida" onClick={handleBeginEditingMessage}></MyIcon>}
                    {isEditingMessage && <Button text='Alterar mensagem' onClick={handlePutNewMessage}></Button>}
                    </div>
                </div>
                {!clicked && <button className={styles.updateButton} onClick={()=>setClicked(true)}>Marcar atualização do processo como visualizada?</button>}
                {clicked && <button className={styles.updateButton} onClick={()=>handlePutHasUpdate()}>Confirmar?</button>}
            </>
            }
            {!props.case.hasUpdate && <>
                <p>&#128077; Sem atualização no último mês</p>
            </>
            }

        </div>
        {sendMessageByWhatsappWindow && <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2>Informações de contato!</h2>
                <button type="button" className={styles.xButton} onClick={() => closeAllCards()}>x</button>
            </div>            
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
            <button type="submit" className={styles.submitButton} onClick={()=>{sendWhatsAppMessage()}}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Enviar
            </button>
        </div>
        }
        {sendMessageByEmailWindow && <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2>Informações de contato!</h2>
                <button type="button" className={styles.xButton} onClick={() => closeAllCards()}>x</button>
            </div>
            {props.lawyer.emailAuth==null &&
            <div className={styles.userBox}>
                <input
                type="text"
                value={lawyerEmailAuth}
                onChange={(e) => setLawyerEmailAuth(e.target.value)}
                required
                />
                <label>A autorização para uso do seu email ainda não foi fornecida</label>
            </div>
            }
            <div className={styles.userBox}>
                <input
                type="text"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                required
                />
                <label>Cliente não especificado. Qual o email dele?</label>
            </div>
            <p>{errorMessage}</p>
            <button type="submit" className={styles.submitButton} onClick={()=>{sendEmailMessage()}}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Enviar
            </button>
        </div>
        }
        {redirectToCaseURLWindow && <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2>Ir à página do processo?</h2>
                <button type="button" className={styles.xButton} onClick={() => closeAllCards()}>x</button>
            </div>      
            <button type="submit" className={styles.submitButton} onClick={()=>{
                window.open(caseURL, '_blank')
                setRedirectToCaseURLWindow(false)
            }}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Sim
            </button>
        </div>
        }
    </div>
    )
}