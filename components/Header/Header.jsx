import styles from './Header.module.css'
import Link from 'next/link'
import LinkBorderButton from '../LinkBorderButton/LinkBorderButton'
import LinkButton from '../LinkButton/LinkButton'

export default function Header(props){
    return (
        <div className={styles.mainHeader}>
            <Link href="/" className={styles.logo}>Advogado AI</Link>
            <div className={styles.navigation}>
                <LinkBorderButton text='Entrar' href='/login'></LinkBorderButton>
                <LinkButton text='Cadastre-se' href="/"></LinkButton>
            </div>
        </div>
    )
}