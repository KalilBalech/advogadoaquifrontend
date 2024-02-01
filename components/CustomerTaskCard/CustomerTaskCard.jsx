import styles from './CustomerTaskCard.module.css'
import clockIcon from '@/public/clockIcon.svg'
import userIcon from '@/public/userIcon.svg'
import xIcon from '@/public/xIcon.svg'
import curvedRightArrowIcon from '@/public/curvedRightArrowIcon.svg'
import Image from 'next/image'
import deleteTask from '@/utils/API/deleteTask'
import getCustomerTasks from '@/utils/API/getCustomerTasks'
import putTaskStatus from '@/utils/API/putTaskStatus'

export default function CustomerTaskCard({task, setSelectedTask, setCustomerTasks, customerID}){

    const taskID = task.id

    const handleDeleteTask = async (e)=>{
        e.stopPropagation(); // para não clicar no botão de fora
        await deleteTask(taskID)
        const customerTasksRefreshed = await getCustomerTasks(customerID)
        setCustomerTasks(customerTasksRefreshed)
    }

    const handleChangeStatus = async (e)=>{
        e.stopPropagation(); // para não clicar no botão de fora
        await putTaskStatus(task)
        const customerTasksRefreshed = await getCustomerTasks(customerID)
        setCustomerTasks(customerTasksRefreshed)
    }
    
    return(
    <div className={`${styles.taskButton}`} onClick={()=>{
        console.log("A próxima selectedTask vai ser: ", task)
        setSelectedTask(task)
        }}>
        <div className={styles.taskButtonHeader}>
            <button className={`${styles.iconButton} ${styles.xButton}`} onClick={(e)=> handleDeleteTask(e)}>
                <Image alt='xIcon' src={xIcon} width={30} height={30} className={`${styles.xIcon} ${styles.icon}`}/>
            </button>
            <p className={styles.taskTitle}>{task.title}</p>
            {task.status!='DONE' && <button className={`${styles.iconButton} ${styles.arrowButton}`} onClick={(e)=> handleChangeStatus(e)}>
                <Image alt='curvedRightArrowIcon' src={curvedRightArrowIcon} width={30} height={30} className={`${styles.rightArrowIcon} ${styles.icon}`}/>
            </button>}
        </div>
        <div className={styles.iconAndInfo}>
            <Image alt='clockIcon' src={clockIcon} width={30} height={30}/>
            <p className={styles.deadlineInfo}>{task && task.deadline && task.deadline.split('-')[2]+'/'+task.deadline.split('-')[1]+'/'+task.deadline.split('-')[0]}</p>
        </div>
        <div className={styles.iconAndInfo}>
            <Image alt='userIcon' src={userIcon} width={30} height={30}/>
            {task.responsibleLawyerID && <p className={styles.responsibleLawyer}>{task.responsibleLawyerID.name}</p>}
        </div>
    </div>
    )
}