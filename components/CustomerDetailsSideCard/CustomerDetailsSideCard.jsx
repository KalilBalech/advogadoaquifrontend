'on client'
import styles from './CustomerDetailsSideCard.module.css'
import xIcon from '@/public/xIcon.svg'
import teamIcon from '@/public/teamIcon.svg'
import hashtagIcon from '@/public/hashtagIcon.svg'
import userIcon from '@/public/userIcon.svg'
import arrowRightIcon from '@/public/arrowRightIcon.svg'
import whatsappIcon from '@/public/whatsappIcon.svg'
import whatsappIconColor from '@/public/whatsappIconColor.svg'
import emailIcon from '@/public/emailIcon.svg'
import emailIconColor from '@/public/emailIconColor.svg'
import Image from 'next/image'
import CaseTasks from '@/components/CaseTasks/CaseTasks'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import TaskDetails from '../TaskDetails/TaskDetails'



export default function CaseDetailsSideCard({selectedModel, setSelectedModel}){
    // MANIPULAÇÃO E ATUALIZAÇÃO DE DADOS
    const [caseName, setCaseName] = useState(selectedModel && selectedModel.name)
    const [caseAnnotation, setCaseAnnotation] = useState(selectedModel && selectedModel.annotation)
    const [caseTasks, setCaseTasks] = useState(selectedModel && selectedModel.tasks)
    const [selectedTask, setSelectedTask] = useState(null)
    const [caseSuggestedMessage, setCaseSuggestedMessage] = useState(selectedModel && selectedModel.suggestedMessage)
    const [caseLastTrackedFile, setCaseLastTrackedFile] = useState(selectedModel && selectedModel.lastTrackedFile)

    const hasPageBeenRendered = useRef({effect1: false, effect2: false, effect3: false})
    // MANIPULAÇÃO DO FRONT END
    const [isCaseAnnotationOpen, setIsCaseAnnotationOpen] = useState(false);
    const [isCaseTasksOpen, setIsCaseTasksOpen] = useState(false);
    const [isCaseSuggestedMessageOpen, setIsCaseSuggestedMessageOpen] = useState(false);
    const [isCaseLastTrackedFileOpen, setIsCaseLastTrackedFileOpen] = useState(false);
    
    const BASE_URL = process.env.BASE_URL;
    const token = localStorage.getItem("token");
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }

    const updateCaseName = () => {
        let nameData = {name: caseName}
        axios.put(`${BASE_URL}/case/${selectedModel && selectedModel.id}/`, nameData, {headers: headers})
        .then((response) => {
            console.log("O CASE NAME FOI ATUALIZADO para ", caseName)
            console.log("response: ", response);
            selectedModel.name = caseName
        })
        .catch((error) => {
            console.log("ERRO AO ATUALIZAR CASE NAME", error);
        });
    }

    const updateCaseAnnotation = () => {
        let annotationData = {annotation: caseAnnotation}
        axios.put(`${BASE_URL}/case/${selectedModel && selectedModel.id}/`, annotationData, {headers: headers})
        .then((response) => {
            console.log("O CASE ANNOTATION FOI ATUALIZADO para ", caseAnnotation)
            console.log("response: ", response);
            selectedModel.annotation = caseAnnotation
        })
        .catch((error) => {
            console.log("ERRO AO ATUALIZAR CASE ANNOTATION", error);
        });
    }

    const updateCaseSuggestedMessage = () => {
        let suggestedMessageData = {suggestedMessage: caseSuggestedMessage}
        axios.put(`${BASE_URL}/case/${selectedModel && selectedModel.id}/`, suggestedMessageData, {headers: headers})
        .then((response) => {
            console.log("O CASE SUGGESTED MESSAGE FOI ATUALIZADO para ", caseSuggestedMessage)
            console.log("response: ", response);
            selectedModel.suggestedMessage = caseSuggestedMessage
        })
        .catch((error) => {
            console.log("ERRO AO ATUALIZAR CASE SUGGESTED MESSAGE", error);
        });
    }

    useEffect(()=>{
        if(hasPageBeenRendered.current['effect1'] && selectedModel && caseName){
            updateCaseName()
        }
        else{
            hasPageBeenRendered.current['effect1'] = true
        }
    }, [caseName])

    useEffect(()=>{
        if(hasPageBeenRendered.current['effect2'] && selectedModel != null && caseAnnotation != null){
            updateCaseAnnotation()
        }
        else{
            hasPageBeenRendered.current['effect2'] = true
        }
    }, [caseAnnotation])

    useEffect(()=>{
        if(hasPageBeenRendered.current['effect3'] && selectedModel != null && caseSuggestedMessage != null){
            updateCaseSuggestedMessage()
        }
        else{
            hasPageBeenRendered.current['effect3'] = true
        }
    }, [caseSuggestedMessage])

    useEffect(()=>{
        setCaseName(selectedModel && selectedModel.name)
        setCaseAnnotation(selectedModel && selectedModel.annotation)
        setCaseTasks(selectedModel && selectedModel.tasks)
        setCaseSuggestedMessage(selectedModel && selectedModel.suggestedMessage)
    }, [selectedModel])

    const sendWhatsAppMessage = ()=>{
        if(!selectedModel.customers[0]){
            alert('Não há cliente definido para esse processo')
            return
        }
        if(!selectedModel.customers[0].phoneNumber){
            alert('Não há celular definido para o cliente desse processo')
            return
        }
        let customerPhoneNumber = selectedModel.customers[0].phoneNumber
        let text = caseSuggestedMessage
        window.open(`https://api.whatsapp.com/send?phone=${customerPhoneNumber}&text=${text}`, '_blank');
    }

    const sendEmailMessage = ()=>{

    }

        
    return(
        <div className={`${styles.rollingCardDiv} ${selectedModel!=null ? styles.rollingCardIn : ''}`}>
            <div className={styles.rollingCardHeader}>
                <button className={styles.xButton} onClick={()=>{setSelectedModel(null)}}>
                    <Image alt='x Icon' src={xIcon} width={50} height={50}/>
                </button>
                <textarea className={styles.inputTitle} rows={1} cols={30} value={caseName!=null ? caseName : ''} onChange={(e)=>{setCaseName(e.target.value)}}/>
                <button className={styles.statusMessage}><p>{selectedModel && selectedModel.status != 'VIS' && 'Movimentações'}</p></button>
            </div>
            <div className={styles.iconInfoSection}>
                <div className={styles.iconInfo}>
                    <Image alt='Team Icon' src={teamIcon} width='40' height='40'></Image>
                    <p className={styles.caseNumber}>Equipe: {selectedModel && selectedModel.lawyers.map(lawyer => lawyer.name).join(', ')}</p>
                </div>
                <div className={styles.iconInfo}>
                    <Image alt='Hashtag Icon' src={hashtagIcon} width='40' height='40'></Image>
                    <p className={styles.caseNumber}>Processo: {selectedModel && selectedModel.number}</p>
                </div>
                <div className={styles.iconInfo}>
                    <Image alt='user Icon' src={userIcon} width='40' height='40'></Image>
                    <p className={styles.caseNumber}>Cliente: {selectedModel && selectedModel.customers.map(customer => customer.name).join(', ')}</p>
                </div>
            </div>
            <div className={styles.arrowInfoSection}>
                <div className={styles.arrowInfo}>
                    <button className={styles.headerArrowInfo} onClick={()=>{setIsCaseAnnotationOpen(!isCaseAnnotationOpen)}}>
                        <Image className={isCaseAnnotationOpen ? styles.imgArrowDown : ''} src={arrowRightIcon} alt='arrowRightIcon' width={20} height={20}></Image>
                        <p>Atendimento</p>
                    </button>
                    {isCaseAnnotationOpen && <div className={styles.contentHiddenSection}>
                        <textarea value={caseAnnotation!=null ? caseAnnotation : ''} placeholder='Registre o atendimento aqui' className={`${styles.inputContent} ${!isCaseAnnotationOpen ? styles.inputDisplayNone: ''}`} onChange={(e)=>{setCaseAnnotation(e.target.value)}}/>
                    </div>}
                </div>
                <div className={styles.arrowInfo}>
                    <button className={styles.headerArrowInfo} onClick={()=>{setIsCaseTasksOpen(!isCaseTasksOpen)}}>
                        <Image className={isCaseTasksOpen ? styles.imgArrowDown : ''} src={arrowRightIcon} alt='arrowRightIcon' width={20} height={20}></Image>
                        <p>Tarefas relacionadas ao processo</p>
                    </button>
                    {isCaseTasksOpen && <div className={`${styles.contentHiddenSection}`}>
                        <CaseTasks caseTasks={selectedModel && caseTasks} setCaseTasks={setCaseTasks} caseID = {selectedModel && selectedModel.id} selectedTask={selectedTask} setSelectedTask={setSelectedTask}/>
                        <TaskDetails selectedModel={selectedModel} selectedTask={selectedTask} setSelectedTask={setSelectedTask}/>
                    </div>}
                </div>
                <div className={styles.arrowInfo}>
                    <button className={styles.headerArrowInfo} onClick={()=>{setIsCaseSuggestedMessageOpen(!isCaseSuggestedMessageOpen)}}>
                        <Image className={isCaseSuggestedMessageOpen ? styles.imgArrowDown : ''} src={arrowRightIcon} alt='arrowRightIcon' width={20} height={20}></Image>
                        <p>Mensagem sugerida</p>
                    </button>
                    {isCaseSuggestedMessageOpen && <div className={`${styles.contentHiddenSection} ${styles.displayFlexColumn}`}>
                    <textarea value={caseSuggestedMessage!=null ? caseSuggestedMessage : ''} 
                        placeholder='Só há sugestões de mensagens quando há movimentações no processo' 
                        className={`${styles.inputContent}`} 
                        onChange={(e)=>{setCaseSuggestedMessage(e.target.value)}}/>
                    <div className={styles.messageButtonsDiv}>
                        <button className={styles.messageButton} onClick={()=>sendWhatsAppMessage()}>
                            <Image alt='whatsappIcon' src={whatsappIcon} width={40} height={40} className={styles.messageIcon}/>
                            <Image alt='whatsappIconColor' src={whatsappIconColor} width={40} height={40} className={styles.messageIconColor}/>
                        </button>
                        <button className={styles.messageButton} onClick={()=>sendEmailMessage()}>
                            <Image alt='emailIcon' src={emailIcon} width={40} height={40} className={styles.messageIcon}/>
                            <Image alt='emailIconColor' src={emailIconColor} width={40} height={40} className={styles.messageIconColor}/>
                        </button>
                    </div>
                    </div>
                    }
                </div>
                <div className={styles.arrowInfo}>
                    <button className={styles.headerArrowInfo} onClick={()=>{setIsCaseLastTrackedFileOpen(!isCaseLastTrackedFileOpen)}}>
                        <Image className={isCaseLastTrackedFileOpen ? styles.imgArrowDown : ''} src={arrowRightIcon} alt='arrowRightIcon' width={20} height={20}></Image>
                        <p>Última publicação</p>
                    </button>
                    <textarea value={caseLastTrackedFile!=null ? caseLastTrackedFile : ''} placeholder='A última publicação não foi registrada' className={`${styles.inputContent} ${!isCaseLastTrackedFileOpen ? styles.inputDisplayNone: ''}`} onChange={(e)=>{setCaseLastTrackedFile(e.target.value)}}/>
                </div>
            </div>
        </div>
    )
}