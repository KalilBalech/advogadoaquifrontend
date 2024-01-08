import styles from './AuthHeader.module.css'
import Link from 'next/link'

export default function AuthHeader(props){
    const handleLogout = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('lawyerID')
    }
    return (
        <div className={styles.mainHeader}>
            <Link href="/" className={styles.logo}>Advogado aqui</Link>
            <ul className={styles.navigation}>
                <li><Link href="/login">Perfil</Link></li>
                <li><Link href="/" onClick={()=> handleLogout()}>Logout</Link></li>
            </ul>
        </div>
    )
}