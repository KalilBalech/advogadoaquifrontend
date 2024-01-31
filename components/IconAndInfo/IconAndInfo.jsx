import styles from './IconAndInfo.module.css'
import Image from 'next/image'

export default function IconAndInfo({alt, src, label, state, setState}){
    return(
        <div className={styles.iconAndInfoDiv}>
            <Image alt={alt} src={src} width={60} height={60}></Image>
            <label className={styles.label}>{label}</label>
            <p className={styles.info}>{state}</p>
        </div>
    )
}