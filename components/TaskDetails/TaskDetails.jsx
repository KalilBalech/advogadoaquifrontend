'on client'
import styles from './TaskDetails.module.css'
import Image from 'next/image'
import clockIcon from '@/public/clockIcon.svg'
import userIcon from '@/public/userIcon.svg'
import arrowLeftIcon from '@/public/arrowLeftIcon.svg'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'


export default function TaskDetails({selectedTask, setSelectedTask}){

    const [taskTitle, setTaskTitle] = useState(selectedTask && selectedTask.title)
    const [taskDescription, setTaskDescription] = useState(selectedTask && selectedTask.description)
    const [taskDeadline, setTaskDeadline] = useState(selectedTask && selectedTask.deadline)
    const hasPageBeenRendered = useRef({effect1: false, effect2: false, effect3: false})

    const BASE_URL = process.env.BASE_URL;
    const token = localStorage.getItem("token");
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }

    const updateTaskTitle = () => {
        let nameData = {title: taskTitle}
        axios.put(`${BASE_URL}/task/${selectedTask && selectedTask.id}/`, nameData, {headers: headers})
        .then((response) => {
            console.log("O TASK TITLE FOI ATUALIZADO para ", taskTitle)
            console.log("response: ", response);
            selectedTask.name = taskTitle
        })
        .catch((error) => {
            console.log("ERRO AO ATUALIZAR CASE NAME", error);
        });
    }

    useEffect(()=>{
        if(hasPageBeenRendered.current['effect1'] && selectedTask && taskTitle){
            updateTaskTitle()
        }
        else{
            hasPageBeenRendered.current['effect1'] = true
        }
    }, [taskTitle])
    
    const updateTaskDescription = () => {
        let nameData = {description: taskDescription}
        axios.put(`${BASE_URL}/task/${selectedTask && selectedTask.id}/`, nameData, {headers: headers})
        .then((response) => {
            console.log("O TASK DESCRIPTION FOI ATUALIZADO para ", taskDescription)
            console.log("response: ", response);
            selectedTask.description = taskDescription
        })
        .catch((error) => {
            console.log("ERRO AO ATUALIZAR CASE NAME", error);
        });
    }

    useEffect(()=>{
        if(hasPageBeenRendered.current['effect2'] && selectedTask && taskDescription){
            updateTaskDescription()
        }
        else{
            hasPageBeenRendered.current['effect2'] = true
        }
    }, [taskDescription])
    
    const updateTaskDeadline = () => {
        let nameData = {deadline: taskDeadline}
        axios.put(`${BASE_URL}/task/${selectedTask && selectedTask.id}/`, nameData, {headers: headers})
        .then((response) => {
            console.log("O TASK DEADLINE FOI ATUALIZADO para ", taskDeadline)
            console.log("response: ", response);
            selectedTask.description = taskDeadline
        })
        .catch((error) => {
            console.log("ERRO AO ATUALIZAR CASE NAME", error);
        });
    }

    useEffect(()=>{
        if(hasPageBeenRendered.current['effect3'] && selectedTask && taskDeadline){
            updateTaskDeadline()
        }
        else{
            hasPageBeenRendered.current['effect3'] = true
        }
    }, [taskDeadline])

    useEffect(()=>{
        setTaskTitle(selectedTask && selectedTask.title)
        setTaskDescription(selectedTask && selectedTask.description)
        setTaskDeadline(selectedTask && selectedTask.deadline)
    }, [selectedTask])    
    
    return(
        <div className={`${styles.taskDetailsDiv} ${selectedTask ? styles.displayBlock : ''}`}>
            <div className={styles.taskDetailsHeader}>
                    <button className={styles.arrowLeftIcon} onClick={()=>setSelectedTask(null)}>
                        <Image alt='arrowLeftIcon' src={arrowLeftIcon} width={50} height={50}/>
                    </button>
                    <input type='text' className={styles.taskTitleInput} value={taskTitle ? taskTitle : ''} onChange={(e)=>{setTaskTitle(e.target.value)}}></input>
            </div>
            <div className={styles.taskDetailsIconAndInfo}>
                <Image alt='clockIcon' src={clockIcon} width={50} height={50}/>
                <input type='date' className={styles.taskDetailDeadlineInput} value={taskDeadline ? taskDeadline : ''} onChange={(e)=>{setTaskDeadline(e.target.value)}}></input>
            </div>
            <div className={styles.taskDetailsIconAndInfo}>
                <Image alt='userIcon' src={userIcon} width={50} height={50}/>
                <label for="lawyers">Responsável:</label>
                <select id="lawyers" name="lawyerlist" form="lawyerform" className={styles.selectLawyer}>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                </select>
            </div>
            <textarea rows={5} value={taskDescription ? taskDescription : ''} onChange={(e)=>{setTaskDescription(e.target.value)}} className={styles.taskDescriptionInput}/>
        </div>
    )
}