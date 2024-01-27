import styles from './Task.module.css'
import clockIcon from '@/public/clockIcon.svg'
import userIcon from '@/public/userIcon.svg'
import Image from 'next/image'

export default function Task({task}){
    return(
    <div className={styles.taskDiv}>
        <p className={styles.taskTitle}>{task.title}</p>
        <div className={styles.iconAndInfo}>
            <Image alt='clockIcon' src={clockIcon} width={30} height={30}/>
            <p className={styles.deadlineInfo}>{task.deadline}</p>
        </div>
        <div className={styles.iconAndInfo}>
            <Image alt='userIcon' src={userIcon} width={30} height={30}/>
            {task.responsibleLawyer!=null && <p className={styles.responsibleLawyer}>{task.responsibleLawyer.name}</p>}
        </div>
    </div>
    )
}