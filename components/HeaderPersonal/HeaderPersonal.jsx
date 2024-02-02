"use client"
import styles from './HeaderPersonal.module.css'
import Link from 'next/link'
import HeaderLink from '@/components/HeaderLink/HeaderLink'
import HeaderIcon from '@/components/HeaderIcon/HeaderIcon'
import { useRouter } from "next/navigation";
import Image from 'next/image'
import AAlogo from '@/public/AAlogo.svg'
import userIcon from '@/public/userIcon.svg'
import exitIcon from '@/public/exitIcon.svg'
import removeToken from '@/utils/removeToken'
import { useEffect, useState } from 'react'

export default function HeaderPersonal(){
    const [logout, setLogout] = useState(false)

    useEffect(()=>{
        if(logout){
            removeToken()
            setLogout(false)
        }
    }, [logout])
    return (<>
        <div className={styles.headerDiv}>
            <Link href="/" className={styles.logo}><Image alt='AA Logo' src={AAlogo} height='80' width='80' priority/></Link>
            <div className={styles.navigationLinks}>
                <HeaderLink href='/clientes'>Clientes</HeaderLink>
                <HeaderLink href='/processos'>Processos</HeaderLink>
                <HeaderLink href='/tarefas'>Tarefas</HeaderLink>
            </div>
            <div className={styles.navigationIcons}>
                <HeaderIcon href='/profile' alt='Icone de usuário' src={userIcon}/>
                <HeaderIcon href="/" alt='Icone de logout' src={exitIcon} onClick={()=>{setLogout(true)}}/>
            </div>
        </div>
        <div className={styles.modeDiv}>
                <span className={styles.standardText}>Pessoal</span>
        </div>
    </>
    )
}