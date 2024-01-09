import Image from 'next/image'
import styles from './MyIcon.module.css'

export default function MyIcon(props){
    return(
        <button className={styles.button} onClick={()=>props.onClick()} title={props.title}>
            <Image src={props.src} alt={props.alt} width={props.width} height={props.height}/>
        </button>
    )
}