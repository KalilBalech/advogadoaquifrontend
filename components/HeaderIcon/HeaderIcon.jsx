import Link from 'next/link'
import { useState } from 'react'
import styles from './HeaderIcon.module.css'
import Image from 'next/image'

export default function HeaderIcon(props){
    const [active, setActive] = useState(props.active)
    const handleClick = ()=>{
        if(!active){
            setActive(True)
        }
    }
    return(
        <Link href={props.href} className={props.active ? styles.purpleStyle : styles.blackStyle} onClick={()=>handleClick()}>
            <Image alt={props.alt} src={props.src} width='60' height='60'></Image>
        </Link>
    )
}