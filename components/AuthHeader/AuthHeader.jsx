import styles from './AuthHeader.module.css'
import Link from 'next/link'
import LinkBorderButton from '../LinkBorderButton/LinkBorderButton'
import LinkButton from '../LinkButton/LinkButton'
import { useRouter } from "next/navigation";


export default function Header(props){
    const router = useRouter();
    const handleLogout = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('lawyerID')
        router.push("/");
    }
    return (
        <div className={styles.mainHeader}>
            <Link href="/" className={styles.logo}>Advogado AI</Link>
            <div className={styles.navigation}>
                <LinkBorderButton text='Meu perfil' href='/profile'></LinkBorderButton>
                <LinkButton text='Logout' href="/" onClick={()=>handleLogout()}></LinkButton>
            </div>
        </div>
    )
}