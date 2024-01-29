import styles from './CaseTasks.module.css'
import plusIcon from '@/public/plusIcon.svg'
import Image from 'next/image'
import Task from '@/components/Task/Task'
import axios from 'axios'
import { useEffect } from 'react'

export default function CaseTasks({caseTasks, setCaseTasks, caseID, selectedTask, setSelectedTask}){

    const BASE_URL = process.env.BASE_URL;
    const token = localStorage.getItem("token");
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }

    const getCaseTasks = () => {
        axios.get(`${BASE_URL}/task/case/${caseID}/`, {headers: headers})
        .then(response => setCaseTasks(response.data))
        .catch(e=>console.log("Ocorreu algum erro ao atulizar o caseTasks: ", e))
    }
    
    const createCaseTask = () => {
        let createTaskData = {
            title: 'Nova Tarefa',
            description: 'Descrição'
        }
        axios.post(`${BASE_URL}/task/case/${caseID}/`, createTaskData, {headers: headers})
        .then(() => getCaseTasks())
        .catch(error => console.log("Ocorreu algum erro ao criar task: ", error))
    }

    useEffect(()=>{
        if(selectedTask == null){
            getCaseTasks()
        }
    }, [selectedTask])

    return(
        <div className={`${styles.tasks} ${selectedTask ? styles.displayNone : ''}`}>
            <div className={styles.taskDiv}>
                <div className={styles.taskTitleDiv}>
                    <p className={styles.title}>
                        A fazer
                    </p>
                    <button className={styles.addTaskButton} onClick={()=>createCaseTask()}>
                        <Image alt='plusIcon' src={plusIcon} width={30} height={30}/>
                    </button>
                </div>
                <ul>
                    {caseTasks && caseTasks.map((task) => {
                        if(task.status === 'TODO'){
                            return <Task key={task.id} task={task} setSelectedTask={setSelectedTask}></Task>
                        }})
                    }
                </ul>
            </div>
            <div className={styles.taskDiv}>
                <div className={styles.taskTitleDiv}>
                    <p className={styles.title}>
                        Fazendo
                    </p>
                </div>            
                <ul>
                    {caseTasks && caseTasks.map((task) => {
                        if(task.status === 'DOING'){
                            return <Task key={task.id} task={task} setSelectedTask={setSelectedTask}></Task>
                        }})
                    }
                </ul>
            </div>
            <div className={styles.taskDiv}>
                <div className={styles.todoTitleDiv}>
                    <p className={styles.title}>
                        Feito
                    </p>
                </div>            
                <ul>
                    {caseTasks && caseTasks.map((task) => {
                        if(task.status === 'DONE'){
                            return <Task key={task.id} task={task} setSelectedTask={setSelectedTask}></Task>
                        }})
                    }
                </ul>
            </div>
        </div>

    )
}