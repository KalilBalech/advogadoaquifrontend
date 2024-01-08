import styles from './Header.module.css'
import Link from 'next/link'

export default function Header(props){
    return (
        <div className={styles.mainHeader}>
            <Link href="/" className={styles.logo}>Advogado aqui</Link>
            <ul className={styles.navigation}>
                <li><Link href="/login">Entrar</Link></li>
                <li><a href="#">Cadastre-se</a></li>
            </ul>
        </div>
    )
}