import styles from './CustomerTasks.module.css'
import plusIcon from '@/public/plusIcon.svg'
import Image from 'next/image'
import CustomerTaskCard from '@/components/CustomerTaskCard/CustomerTaskCard'
import { useEffect } from 'react'
import createCustomerTask from '@/utils/API/createCustomerTask'
import putTaskResponsibleLawyer from '@/utils/API/putTaskResponsibleLawyer'
import getCustomerTasks from '@/utils/API/getCustomerTasks'

export default function CustomerTasks({customerTasks, setCustomerTasks, customerID, selectedTask, setSelectedTask}){

    // pega as caseTasks antes de entrar em uma task selecionado e depois de sair de um case task selecionado
    useEffect(()=>{
        const fetchCaseTasks = async () => {
            if (selectedTask == null) {
                try {
                    const customerTasksRefreshed = await getCustomerTasks(customerID);
                    setCustomerTasks(customerTasksRefreshed);
                } catch (e) {
                    console.log("Erro ao buscar customer Tasks:", e);
                }
            }
        };
        fetchCaseTasks();
    }, [selectedTask])

    const handleTaskCreation = async () => {
        const taskID = await createCustomerTask(customerID)
        await putTaskResponsibleLawyer(taskID)
        const caseTasksRefreshed = await getCustomerTasks(customerID);
        setCustomerTasks(caseTasksRefreshed); 
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
                    {customerTasks && customerTasks.map((task) => {
                        if(task.status === 'TODO'){
                            return <CustomerTaskCard key={task.id} 
                                                task={task}
                                                setSelectedTask={setSelectedTask} 
                                                setCustomerTasks={setCustomerTasks}
                                                customerID={customerID}/>
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
                    {customerTasks && customerTasks.map((task) => {
                        if(task.status === 'DOING'){
                            return <CustomerTaskCard key={task.id} 
                                                task={task} 
                                                setSelectedTask={setSelectedTask} 
                                                setCustomerTasks={setCustomerTasks}
                                                customerID={customerID}/>
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
                    {customerTasks && customerTasks.map((task) => {
                        if(task.status === 'DONE'){
                            return <CustomerTaskCard key={task.id} 
                                                task={task} 
                                                setSelectedTask={setSelectedTask} 
                                                setCustomerTasks={setCustomerTasks}
                                                customerID={customerID}/>
                        }})
                    }
                </ul>
            </div>
        </div>

    )
}