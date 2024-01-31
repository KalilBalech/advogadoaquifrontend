import styles from './CardIconAndInfo.module.css'
import Image from 'next/image'

export default function CardIconAndInfo({src, alt, info}){
    return(
        <div className={styles.iconAndInfoDiv}>
            <Image alt={alt} src={src} width='20' height='20'></Image>
            <p className={styles.caseNumber}>{info}</p>
        </div>
    )
}