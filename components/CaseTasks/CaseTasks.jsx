import styles from './CaseTasks.module.css'
import plusIcon from '@/public/plusIcon.svg'
import Image from 'next/image'
import TaskCard from '@/components/TaskCard/TaskCard'
import { useEffect } from 'react'
import createCaseTask from '@/utils/API/createCaseTask'
import putTaskResponsibleLawyer from '@/utils/API/putTaskResponsibleLawyer'
import getCaseTasks from '@/utils/API/getCaseTasks'

export default function CaseTasks({caseTasks, setCaseTasks, caseID, selectedTask, setSelectedTask}){

    // pega as caseTasks antes de entrar em uma task selecionado e depois de sair de um case task selecionado
    useEffect(()=>{
        const fetchCaseTasks = async () => {
            if (selectedTask == null) {
                try {
                    const caseTasksRefreshed = await getCaseTasks(caseID);
                    setCaseTasks(caseTasksRefreshed);
                } catch (e) {
                    console.log("Erro ao buscar caseTasks:", e);
                }
            }
        };
        fetchCaseTasks();
    }, [selectedTask])

    const handleTaskCreation = async () => {
        const taskID = await createCaseTask(caseID)
        await putTaskResponsibleLawyer(taskID)
        const caseTasksRefreshed = await getCaseTasks(caseID);
        setCaseTasks(caseTasksRefreshed); 
    };

    return(
        <div className={`${styles.tasks} ${selectedTask ? styles.displayNone : ''}`}>
            <div className={styles.taskDiv}>
                <div className={styles.taskTitleDiv}>
                    <p className={styles.title}>
                        A fazer
                    </p>
                    <button className={styles.addTaskButton} onClick={()=>handleTaskCreation()}>
                        <Image alt='plusIcon' src={plusIcon} width={30} height={30}/>
                    </button>
                </div>
                <ul>
                    {caseTasks && caseTasks.map((task) => {
                        if(task.status === 'TODO'){
                            return <TaskCard key={task.id} 
                                            task={task}
                                            setSelectedTask={setSelectedTask} 
                                            setCaseTasks={setCaseTasks}
                                            caseID={caseID}/>
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
                            return <TaskCard key={task.id} 
                                            task={task} 
                                            setSelectedTask={setSelectedTask} 
                                            setCaseTasks={setCaseTasks}
                                            caseID={caseID}/>
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
                            return <TaskCard key={task.id} 
                                        task={task} 
                                        setSelectedTask={setSelectedTask} 
                                        setCaseTasks={setCaseTasks}
                                        caseID={caseID}/>
                        }})
                    }
                </ul>
            </div>
        </div>

    )
}