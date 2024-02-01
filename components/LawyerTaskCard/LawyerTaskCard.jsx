import styles from './LawyerTaskCard.module.css'
import clockIcon from '@/public/clockIcon.svg'
import userIcon from '@/public/userIcon.svg'
import xIcon from '@/public/xIcon.svg'
import curvedRightArrowIcon from '@/public/curvedRightArrowIcon.svg'
import Image from 'next/image'
import deleteTask from '@/utils/API/deleteTask'
import getLawyerTasks from '@/utils/API/getLawyerTasks'
import putTaskStatus from '@/utils/API/putTaskStatus'

export default function LawyerTaskCard({task, setSelectedTask, setTasks, lawyerID}){

    const taskID = task.id

    const handleDeleteTask = async (e)=>{
        e.stopPropagation(); // para não clicar no botão de fora
        await deleteTask(taskID)
        const caseTasksRefreshed = await getLawyerTasks()
        setTasks(caseTasksRefreshed)
    }

    const handleChangeStatus = async (e)=>{
        e.stopPropagation(); // para não clicar no botão de fora
        await putTaskStatus(task)
        const caseTasksRefreshed = await getLawyerTasks()
        setTasks(caseTasksRefreshed)
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