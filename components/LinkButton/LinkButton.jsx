import styles from './LinkButton.module.css'
import Link from 'next/link'

export default function Button(props){
    return(
        <Link href={props.href} className={styles.button} onClick={props.onClick}>{props.text}</Link>
    )
}