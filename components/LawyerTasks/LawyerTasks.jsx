import styles from './LawyerTasks.module.css'
import plusIcon from '@/public/plusIcon.svg'
import Image from 'next/image'
import LawyerTaskCard from '@/components/LawyerTaskCard/LawyerTaskCard'
import { useEffect } from 'react'
import createCustomerTask from '@/utils/API/createCustomerTask'
import putTaskResponsibleLawyer from '@/utils/API/putTaskResponsibleLawyer'
import getLawyerTasks from '@/utils/API/getLawyerTasks'
import createLawyerTask from '@/utils/API/createLawyerTask'

export default function Tasks({tasks, setTasks, ownerID, selectedTask, setSelectedTask}){

    // pega as caseTasks antes de entrar em uma task selecionado e depois de sair de um case task selecionado
    useEffect(()=>{
        const fetchCaseTasks = async () => {
            if (selectedTask == null) {
                try {
                    const tasksRefreshed = await getLawyerTasks(); // essa função é personalizavel
                    setTasks(tasksRefreshed);
                } catch (e) {
                    console.log("Erro ao buscar customer Tasks:", e);
                }
            }
        };
        fetchCaseTasks();
    }, [selectedTask])

    const handleTaskCreation = async () => {
        const taskID = await createLawyerTask(customerID) // essa função é personalizavel
        await putTaskResponsibleLawyer(taskID)
        const caseTasksRefreshed = await getLawyerTasks(customerID); // essa função é personalizavel
        setTasks(caseTasksRefreshed); 
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
                    {tasks && tasks.map((task) => {
                        if(task.status === 'TODO'){
                            return <LawyerTaskCard key={task.id} 
                                                task={task}
                                                setSelectedTask={setSelectedTask} 
                                                setTasks={setTasks}
                                                lawyerID={ownerID}/>
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
                    {tasks && tasks.map((task) => {
                        if(task.status === 'DOING'){
                            return <LawyerTaskCard key={task.id} 
                            task={task}
                            setSelectedTask={setSelectedTask} 
                            setTasks={setTasks}
                            lawyerID={ownerID}/>
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
                    {tasks && tasks.map((task) => {
                        if(task.status === 'DONE'){
                            return <LawyerTaskCard key={task.id} 
                            task={task}
                            setSelectedTask={setSelectedTask} 
                            setTasks={setTasks}
                            lawyerID={ownerID}/>
                        }})
                    }
                </ul>
            </div>
        </div>

    )
}