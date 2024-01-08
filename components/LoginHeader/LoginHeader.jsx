import styles from './LoginHeader.module.css'
import Link from 'next/link'

export default function LoginHeader(props){
    const handleLogout = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('lawyerID')
    }
    return (
        <div className={styles.mainHeader}>
            <Link href="/" className={styles.logo}>Advogado aqui</Link>
        </div>
    )
}