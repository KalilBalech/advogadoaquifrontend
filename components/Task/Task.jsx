import styles from './Task.module.css'
import clockIcon from '@/public/clockIcon.svg'
import userIcon from '@/public/userIcon.svg'
import xIcon from '@/public/xIcon.svg'
import curvedRightArrowIcon from '@/public/curvedRightArrowIcon.svg'
import Image from 'next/image'
import axios from 'axios'
import { useState } from 'react'

export default function Task({task, setSelectedTask, setCaseTasks, caseID}){

    const [taskDeleted, setTaskDeleted]= useState(false)

    const BASE_URL = process.env.BASE_URL;
    const token = localStorage.getItem("token");
    const taskID = task.id
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }

    const deleteTask = (e)=>{
        e.stopPropagation(); // para não clicar no botão de fora
        axios.delete(`${BASE_URL}/task/${taskID}/`, {headers})
        .then((response)=>{
            console.log(`Task deleted successfully ${taskID}: ${response}`)
            setTaskDeleted(true)
        })
        .catch((error)=>{console.log(`Some error occurred while deleting task ${taskID}: `, error)})
    }

    const getCaseTasks = () => {
        axios.get(`${BASE_URL}/task/case/${caseID}/`, {headers: headers})
        .then(response => setCaseTasks(response.data))
        .catch(e=>console.log("Ocorreu algum erro ao atulizar o caseTasks: ", e))
    }

    const changeStatus = (e)=>{
        e.stopPropagation(); // para não clicar no botão de fora
        let newStatus;
        if(task.status == 'TODO'){
            newStatus = {
                status: 'DOING'
            }
        }
        else if(task.status == 'DOING'){
            newStatus = {
                status: 'DONE'
            }
        }
        axios.put(`${BASE_URL}/task/${taskID}/`,newStatus, {headers})
        .then((response) => {
            console.log(`STATUS ALTERADO COM SUCESSO TASK: ${taskID}: `, response)
            getCaseTasks()
        })
        .catch(e=>console.log("Ocorreu algum erro ao ALTERAR STATUS DA task: ", e))
    }
    return(
    <div className={`${styles.taskButton} ${taskDeleted ? styles.displayNone : ''}`} onClick={()=>setSelectedTask(task)}>
        <div className={styles.taskButtonHeader}>
            <button className={`${styles.iconButton} ${styles.xButton}`} onClick={(e)=> deleteTask(e)}>
                <Image alt='xIcon' src={xIcon} width={30} height={30} className={`${styles.xIcon} ${styles.icon}`}/>
            </button>
            <p className={styles.taskTitle}>{task.title}</p>
            {task.status!='DONE' && <button className={`${styles.iconButton} ${styles.arrowButton}`} onClick={(e)=> changeStatus(e)}>
                <Image alt='curvedRightArrowIcon' src={curvedRightArrowIcon} width={30} height={30} className={`${styles.rightArrowIcon} ${styles.icon}`}/>
            </button>}
        </div>
        <div className={styles.iconAndInfo}>
            <Image alt='clockIcon' src={clockIcon} width={30} height={30}/>
            <p className={styles.deadlineInfo}>{task.deadline.split('-')[2]+'/'+task.deadline.split('-')[1]+'/'+task.deadline.split('-')[0]}</p>
        </div>
        <div className={styles.iconAndInfo}>
            <Image alt='userIcon' src={userIcon} width={30} height={30}/>
            {task.responsibleLawyerID && <p className={styles.responsibleLawyer}>{task.responsibleLawyerID.name}</p>}
        </div>
    </div>
    )
}