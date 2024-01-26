import styles from './Button.module.css'
import Link from 'next/link'

export default function Button(props){
    const getStyle = ()=>{
        if(props.borderButton){
            return styles.borderButton
        }
        if(props.whatsapp){
            return styles.whatsapp
        }
        return styles.button
    }
    return(
        <button className={getStyle()} onClick={props.onClick}>{props.text}</button>
    )
}