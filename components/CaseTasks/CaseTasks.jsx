import styles from './CaseTasks.module.css'
import plusIcon from '@/public/plusIcon.svg'
import Image from 'next/image'
import Task from '@/components/Task/Task'

export default function CaseTasks({tasks}){
    return(
        <div className={styles.tasks}>
            <div className={styles.taskDiv}>
                <div className={styles.taskTitleDiv}>
                    <p className={styles.title}>
                        A fazer
                    </p>
                    <button className={styles.addTaskButton}>
                        <Image alt='plusIcon' src={plusIcon} width={30} height={30}/>
                    </button>
                </div>
                <ul>
                    {tasks && tasks.map((task) => {
                        if(task.status === 'TODO'){
                            return <Task key={task.id} task={task}></Task>
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
                            return <Task key={task.id} task={task}></Task>
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
                            return <Task key={task.id} task={task}></Task>
                        }})
                    }
                </ul>
            </div>
        </div>
    )
}