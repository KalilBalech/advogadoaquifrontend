'on client'
import styles from './CustomerDetailsSideCard.module.css'
import xIcon from '@/public/xIcon.svg'
import userIcon from '@/public/userIcon.svg'
import emailIcon from '@/public/emailIcon.svg'
import emailIconColor from '@/public/emailIconColor.svg'
import whatsappIcon from '@/public/whatsappIcon.svg'
import whatsappIconColor from '@/public/whatsappIconColor.svg'
import Image from 'next/image'
import CustomerTasks from '@/components/CustomerTasks/CustomerTasks'
import { useEffect, useRef, useState } from 'react'
import TaskDetails from '../TaskDetails/TaskDetails'
import DetailsSideCardDiv from '@/components/DetailsSideCardDiv/DetailsSideCardDiv'
import DetailsSideBarArrowInfo from '@/components/DetailsSideBarArrowInfo/DetailsSideBarArrowInfo'
import IconAndInput from '@/components/IconAndInput/IconAndInput'
import putCustomerEmail from '@/utils/API/putCustomerEmail'
import putCustomerPhoneNumber from '@/utils/API/putCustomerPhoneNumber'
import CustomerCasesCard from '@/components/CustomerCasesCard/CustomerCasesCard'

export default function CustomerDetailsSideCard({selectedCustomer, setSelectedCustomer}){
    // MANIPULAÇÃO E ATUALIZAÇÃO DE DADOS
    const [customerName, setCustomerName] = useState(selectedCustomer && selectedCustomer.name)
    const [customerEmail, setCustomerEmail] = useState(selectedCustomer && selectedCustomer.email)
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState(selectedCustomer && selectedCustomer.phoneNumber)
    
    const [customerTasks, setCustomerTasks] = useState(selectedCustomer && selectedCustomer.tasks)
    const [selectedTask, setSelectedTask] = useState(null)

    const [customerCases, setCustomerCases] = useState(selectedCustomer && selectedCustomer.cases)

    const prevSelectedCustomerRef = useRef();
    // const justLoadedSelectedCustomer = useRef(false);
    // carrega as variaveis quando selectedCustomer deixar de ser NULL
    useEffect(()=>{
        if(prevSelectedCustomerRef.current === null && selectedCustomer){
            setCustomerName(selectedCustomer.name)
            setCustomerEmail(selectedCustomer.email)
            setCustomerPhoneNumber(selectedCustomer.phoneNumber)

            setCustomerCases(selectedCustomer.cases)
            setCustomerTasks(selectedCustomer.tasks)
            // justLoadedSelectedCustomer.current = true
        }
        // Atualizar a ref com o valor atual de selectedCustomer
        prevSelectedCustomerRef.current = selectedCustomer;
    }, [selectedCustomer])

    useEffect(()=>{
        if(selectedCustomer){
            putCustomerEmail(selectedCustomer.id, customerEmail)
            setSelectedCustomer(selectedCustomer=>{return {...selectedCustomer, email: customerEmail}})
        }
    }, [customerEmail])

    useEffect(()=>{
        if(selectedCustomer){
            putCustomerPhoneNumber(selectedCustomer.id, customerPhoneNumber)
            setSelectedCustomer(selectedCustomer=>{return {...selectedCustomer, phoneNumber: customerPhoneNumber}})
        }
    }, [customerPhoneNumber])

    useEffect(()=>{
        if (selectedTask) {
            console.log("selectedTask foi alterada: ", selectedTask)
          const updatedCustomerTasks = customerTasks.map(taskItem => 
            taskItem.id === selectedTask.id ? selectedTask : taskItem
          );
          setCustomerTasks(updatedCustomerTasks);
        }
    
      }, [selectedTask])

    useEffect(() =>{
        if(selectedCustomer){
            console.log("Customer Tasks foi atualizad @@@@@")
            setSelectedCustomer(selectedCustomer=>{return {...selectedCustomer, tasks:customerTasks}})
            console.log("o Customer selecionado da customerTasks foi atualizado")
        }
    }, [customerTasks])

    useEffect(() =>{
        if(selectedCustomer){
            console.log("Customer cases foi atualizado")
            setSelectedCustomer(selectedCustomer=>{return {...selectedCustomer, cases:customerCases}})
            console.log("o Customer selecionado da customerCases foi atualizado")
        }
    }, [customerCases])
        
    return(
        <DetailsSideCardDiv selectedModel={selectedCustomer}>
            <div className={styles.rollingCardHeader}>
                <button className={styles.xButton} onClick={()=>{setSelectedCustomer(null)}}>
                    <Image alt='x Icon' src={xIcon} width={50} height={50}/>
                </button>
                <textarea className={styles.inputTitle} 
                rows={1} 
                cols={30} 
                value={customerName ? customerName : ''} 
                onChange={(e)=>{
                    justLoadedSelectedCustomer.current = false
                    setCustomerName(e.target.value)
                    }}/>
            </div>
            <div className={styles.arrowInfoSection}>
                <DetailsSideBarArrowInfo title={'Cadastro'}>
                    <IconAndInput alt='Email' src={emailIcon} srcOnHover={emailIconColor} label={'Email: '} placeholder={' ... '} state={customerEmail} setState={setCustomerEmail}/>
                    <IconAndInput alt='Phone' src={whatsappIcon} srcOnHover={whatsappIconColor} label={'Telefone: '} placeholder={' ... '} state={customerPhoneNumber} setState={setCustomerPhoneNumber}/>
                </DetailsSideBarArrowInfo>
                <DetailsSideBarArrowInfo title={'Processos'}>
                <ul>
                    {customerCases && customerCases.map((caseItem) => (
                    <CustomerCasesCard key={caseItem.id} caseItem={caseItem} customerCases={customerCases} setCustomerCases={setCustomerCases}/>
                    ))}
                </ul>
                {(!customerCases || customerCases.length == 0) && 
                    <p>Não há processos</p>
                }
                </DetailsSideBarArrowInfo>
                <DetailsSideBarArrowInfo title={'Tarefas relacionadas ao cliente'}>
                    <div className={`${styles.contentHiddenSection}`}>
                        <CustomerTasks customerTasks={selectedCustomer && customerTasks} setCustomerTasks={setCustomerTasks} customerID = {selectedCustomer && selectedCustomer.id} selectedTask={selectedTask} setSelectedTask={setSelectedTask}/>
                        <TaskDetails selectedCase={selectedCustomer} selectedTask={selectedTask} setSelectedTask={setSelectedTask}/>
                    </div>
                </DetailsSideBarArrowInfo>
                {/* <DetailsSideBarArrowInfo title={'Atendimentos'}>
                    <div className={`${styles.contentHiddenSection} ${styles.displayFlexColumn}`}>
                        <textarea value={caseSuggestedMessage!=null ? caseSuggestedMessage : ''} 
                            placeholder='Só há sugestões de mensagens quando há movimentações no processo' 
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
                <DetailsSideBarArrowInfo title={'Tarefas relacionadas ao cliente'}>
                    <textarea value={caseLastTrackedFile!=null ? caseLastTrackedFile : ''} 
                    placeholder='A última publicação não foi registrada' 
                    className={`${styles.inputContent}`} 
                    onChange={(e)=>{
                        justLoadedSelectedCase.current = false
                        setCaseLastTrackedFile(e.target.value)
                    }}/>
                </DetailsSideBarArrowInfo> */}
            </div>
        </DetailsSideCardDiv>
    )
}