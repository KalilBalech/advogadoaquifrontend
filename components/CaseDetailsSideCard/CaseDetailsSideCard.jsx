'on client'
import styles from './CaseDetailsSideCard.module.css'
import xIcon from '@/public/xIcon.svg'
import teamIcon from '@/public/teamIcon.svg'
import hashtagIcon from '@/public/hashtagIcon.svg'
import userIcon from '@/public/userIcon.svg'
import whatsappIcon from '@/public/whatsappIcon.svg'
import whatsappIconColor from '@/public/whatsappIconColor.svg'
import emailIcon from '@/public/emailIcon.svg'
import emailIconColor from '@/public/emailIconColor.svg'
import addUserIcon from '@/public/addUserIcon.svg'
import Image from 'next/image'
import CaseTasks from '@/components/CaseTasks/CaseTasks'
import AddLawyerToCaseInput from '@/components/AddLawyerToCaseInput/AddLawyerToCaseInput'
import { useEffect, useState, useRef } from 'react'
import TaskDetails from '../TaskDetails/TaskDetails'
import DetailsSideBarArrowInfo from '../DetailsSideBarArrowInfo/DetailsSideBarArrowInfo'
import DetailsSideCardDiv from '../DetailsSideCardDiv/DetailsSideCardDiv'

import updateCaseName from '@/utils/API/updateCaseName'
import putCaseAnnotation from '@/utils/API/putCaseAnnotation'
import updateCaseSuggestedMessage from '@/utils/API/updateCaseSuggestedMessage'
import updateCaseLastTrackedFile from '@/utils/API/updateCaseLastTrackedFile'
import putCaseAddLawyer from '@/utils/API/putCaseAddLawyer'

export default function CaseDetailsSideCard({selectedCase, setSelectedCase}){

    const [caseName, setCaseName] = useState(selectedCase && selectedCase.name)
    const [caseAnnotation, setCaseAnnotation] = useState(selectedCase && selectedCase.annotation)
    const [caseTasks, setCaseTasks] = useState(selectedCase && selectedCase.tasks)
    const [caseSuggestedMessage, setCaseSuggestedMessage] = useState(selectedCase && selectedCase.suggestedMessage)
    const [caseLastTrackedFile, setCaseLastTrackedFile] = useState(selectedCase && selectedCase.lastTrackedFile)
    const [caseLawyers, setCaseLawyers] = useState(selectedCase && selectedCase.lawyers)

    const [selectedTask, setSelectedTask] = useState(null)
    
    // ATUALIZA AS VARIAVEIS SEMPRE QUE SELECTMODEL MUDAR
    const prevSelectedCaseRef = useRef();
    const justLoadedSelectedCase = useRef(false);
    useEffect(()=>{
        if(prevSelectedCaseRef.current === null && selectedCase){
            setCaseName(selectedCase.name)
            setCaseAnnotation(selectedCase.annotation)
            setCaseTasks(selectedCase.tasks)
            setCaseSuggestedMessage(selectedCase.suggestedMessage)
            setCaseLastTrackedFile(selectedCase.lastTrackedFile)
            setCaseLawyers(selectedCase.lawyers)
            justLoadedSelectedCase.current = true
        }
        // Atualizar a ref com o valor atual de selectedCase
        prevSelectedCaseRef.current = selectedCase;
    }, [selectedCase])
    
    // ATUALIZAR O A ARVORE DE DADOS DO FRONTEND
    useEffect(()=>{
        if (selectedTask) {
            console.log("selectedTask foi alterada: ", selectedTask)
          const updatedCaseTasks = caseTasks.map(taskItem => 
            taskItem.id === selectedTask.id ? selectedTask : taskItem
          );
          setCaseTasks(updatedCaseTasks);
        }
    
      }, [selectedTask])
    
    // CADA SETSTATE TEM UM USEEFFECT QUE ATUALIZA A ARVORE DE DADOS, E, SE FOR O CASO, ATUALIZA A BASE DE DADOS
    // CADA SETSTATE ATUALIZA O FRONT E O BACKEND
    // ISSO DEVE SER FEITO NO LOCAL DE DECLARAÇÃO DOS STATES
    useEffect(() =>{
        if(selectedCase){
            console.log("Case Tasks foi atualizad @@@@@")
            setSelectedCase(selectedCase=>{return {...selectedCase, tasks:caseTasks}})
            console.log("o case selecionado da caseTasks foi atualizado")
        }
    }, [caseTasks])

    useEffect(()=>{
        if(selectedCase){
            updateCaseName(selectedCase.id, caseName)
            setSelectedCase(selectedCase=>{return {...selectedCase, name: caseName}})
        }
    }, [caseName])

    useEffect(()=>{
        // Só atualiza na base de dados se o novo caseAnnotation for da edição
        if(selectedCase && !justLoadedSelectedCase.current){
            putCaseAnnotation(selectedCase.id, caseAnnotation)
            setSelectedCase(selectedCase=>{return {...selectedCase, annotation: caseAnnotation}})
        }
    }, [caseAnnotation])

    useEffect(()=>{
        if(selectedCase && !justLoadedSelectedCase.current){
            updateCaseSuggestedMessage(selectedCase.id, caseSuggestedMessage)
            setSelectedCase(selectedCase=>{return {...selectedCase, suggestedMessage: caseSuggestedMessage}})
        }
    }, [caseSuggestedMessage])

    useEffect(()=>{
        if(selectedCase && !justLoadedSelectedCase.current){
            updateCaseLastTrackedFile(selectedCase.id, caseLastTrackedFile)
            setSelectedCase(selectedCase=>{return {...selectedCase, lastTrackedFile: caseLastTrackedFile}})
        }
    }, [caseLastTrackedFile])

    useEffect(()=>{
        if(selectedCase && !justLoadedSelectedCase.current){
            // const updatedCaseTasks = caseTasks.map(taskItem =>{return {...taskItem, lawyers: caseLawyers}});
            // setCaseTasks(updatedCaseTasks);
            setSelectedCase(selectedCase=>{return {...selectedCase, lawyers: caseLawyers}})
        }
    }, [caseLawyers])

    const sendWhatsAppMessage = ()=>{
        if(!selectedCase.customers[0]){
            alert('Não há cliente definido para esse processo')
            return
        }
        if(!selectedCase.customers[0].phoneNumber){
            alert('Não há celular definido para o cliente desse processo')
            return
        }
        let customerPhoneNumber = selectedCase.customers[0].phoneNumber
        let text = caseSuggestedMessage
        window.open(`https://api.whatsapp.com/send?phone=${customerPhoneNumber}&text=${text}`, '_blank');
    }

    const sendEmailMessage = ()=>{

    }

    const [addLawyerToCaseInput, setAddLawyerToCaseInput] = useState(false)
    const [newCaseLawyer, setNewCaseLawyer] = useState()

    useEffect(()=>{
        async function addLawyer(){
            if(newCaseLawyer){
                setAddLawyerToCaseInput(false)
                if(confirm(`Adicionar advogado ao processo?\n\nNome: ${newCaseLawyer.name}\nEmail: ${newCaseLawyer.email}`)){
                    await putCaseAddLawyer(selectedCase.id, newCaseLawyer.id)
                    const newLawyerList = [newCaseLawyer]
                    setCaseLawyers(currentCaseLawyers=>[...currentCaseLawyers, ...newLawyerList])
                }
                setNewCaseLawyer(null)
            }
        }
        addLawyer()
    }, [newCaseLawyer])
        
    return(
        <DetailsSideCardDiv selectedModel={selectedCase}>
            <div className={styles.rollingCardHeader}>
                <button className={styles.xButton} onClick={()=>{setSelectedCase(null)}}>
                    <Image alt='x Icon' src={xIcon} width={50} height={50}/>
                </button>
                <textarea className={styles.inputTitle} 
                rows={1} 
                cols={30} 
                value={caseName ? caseName : ''} 
                onChange={(e)=>{
                    justLoadedSelectedCase.current = false
                    setCaseName(e.target.value)
                    }}/>
                <button className={styles.statusMessage}><p>{selectedCase && selectedCase.status != 'VIS' && 'Movimentações'}</p></button>
            </div>
            <div className={styles.iconInfoSection}>
                <div className={`${styles.iconInfo} ${styles.teamIconInfo}`}>
                        <button className={`${styles.addUserButton}`} onClick={()=>{setAddLawyerToCaseInput(!addLawyerToCaseInput)}}>
                            <Image alt='Team Icon' src={teamIcon} width='40' height='40' className={styles.teamIcon}></Image>
                            <Image alt='Add User Icon' src={addUserIcon} width='40' height='40' className={`${styles.displayNone} ${styles.addUserIcon}`}></Image>
                        </button>
                        <p className={styles.caseNumber}>Equipe: {caseLawyers && caseLawyers.map(lawyer => lawyer.name).join(', ')}</p>
                    {addLawyerToCaseInput && <AddLawyerToCaseInput newCaseLawyer={newCaseLawyer} setNewCaseLawyer={setNewCaseLawyer}/>}
                </div>
                <div className={styles.iconInfo}>
                    <Image alt='Hashtag Icon' src={hashtagIcon} width='40' height='40'></Image>
                    <p className={styles.caseNumber}>Processo: {selectedCase && selectedCase.number}</p>
                </div>
                <div className={styles.iconInfo}>
                    <Image alt='user Icon' src={userIcon} width='40' height='40'></Image>
                    <p className={styles.caseNumber}>Cliente: {selectedCase && selectedCase.customers && selectedCase.customers.map(customer => customer.name).join(', ')}</p>
                </div>
            </div>
            <div className={styles.arrowInfoSection}>
                <DetailsSideBarArrowInfo title={'Última publicação'}>
                    <textarea value={caseLastTrackedFile!=null ? caseLastTrackedFile : ''} 
                    rows={10}
                    placeholder='A última publicação não foi registrada' 
                    className={`${styles.inputContent}`} 
                    onChange={(e)=>{
                        justLoadedSelectedCase.current = false
                        setCaseLastTrackedFile(e.target.value)
                    }}/>
                </DetailsSideBarArrowInfo>
                <DetailsSideBarArrowInfo title={'Mensagem sugerida'}>
                    <div className={`${styles.contentHiddenSection} ${styles.displayFlexColumn}`}>
                        <textarea value={caseSuggestedMessage!=null ? caseSuggestedMessage : ''} 
                            placeholder='Só há sugestões de mensagens quando há movimentações no processo'
                            rows={10}
                            className={`${styles.inputContent}`} 
                            onChange={(e)=>{
                                justLoadedSelectedCase.current = false
                                setCaseSuggestedMessage(e.target.value)
                                }}/>
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
                </DetailsSideBarArrowInfo>
                <DetailsSideBarArrowInfo title={'Atendimento'}>
                    <textarea value={caseAnnotation!=null ? caseAnnotation : ''} 
                    placeholder='Registre o atendimento aqui' 
                    className={`${styles.inputContent}`} 
                    onChange={(e)=>{
                        justLoadedSelectedCase.current = false
                        setCaseAnnotation(e.target.value)
                        }}/>
                </DetailsSideBarArrowInfo>
                <DetailsSideBarArrowInfo title={'Tarefas relacionadas ao processo'}>
                    <div className={`${styles.contentHiddenSection}`}>
                        <CaseTasks caseTasks={selectedCase && caseTasks} setCaseTasks={setCaseTasks} caseID = {selectedCase && selectedCase.id} selectedTask={selectedTask} setSelectedTask={setSelectedTask}/>
                        <TaskDetails selectedCase={selectedCase} selectedTask={selectedTask} setSelectedTask={setSelectedTask}/>
                    </div>
                </DetailsSideBarArrowInfo>
            </div>
        </DetailsSideCardDiv>
    )
}