import styles from './HeaderPersonal.module.css'
import Link from 'next/link'
import HeaderLink from '@/components/HeaderLink/HeaderLink'
import HeaderIcon from '@/components/HeaderIcon/HeaderIcon'
import { useRouter } from "next/navigation";
import Image from 'next/image'
import AAlogo from '@/public/AAlogo.svg'
import userIcon from '@/public/userIcon.svg'
import exitIcon from '@/public/exitIcon.svg'

export default function HeaderPersonal(props){
    const router = useRouter();
    const handleLogout = ()=>{
        console.log("vai dar logout")
        localStorage.removeItem('token')
        localStorage.removeItem('lawyerID')
        router.push("/");
    }
    return (<>
        <div className={styles.headerDiv}>
            <Link href="/" className={styles.logo}><Image alt='AA Logo' src={AAlogo} height='80' width='80'/></Link>
            <div className={styles.navigationLinks}>
                <HeaderLink href='/clientes' active={true}>Clientes</HeaderLink>
                <HeaderLink href='/processos'>Processos</HeaderLink>
                <HeaderLink href='/tarefas'>Tarefas</HeaderLink>
            </div>
            <div className={styles.navigationIcons}>
                <HeaderIcon text='Meu perfil' href='/profile' alt='Icone de usuário' src={userIcon}></HeaderIcon>
                <HeaderIcon text='Logout' href="/" alt='Icone de logout' src={exitIcon} onClick={()=>{handleLogout();}}></HeaderIcon>
            </div>
        </div>
        <div className={styles.modeDiv}>
            Pessoal
        </div>
    </>
    )
}