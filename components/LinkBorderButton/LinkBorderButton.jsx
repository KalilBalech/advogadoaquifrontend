import styles from './LinkBorderButton.module.css'
import Link from 'next/link'

export default function BorderButton(props){
    return(
        <Link href={props.href} className={styles.button}>{props.text}</Link>
    )
}