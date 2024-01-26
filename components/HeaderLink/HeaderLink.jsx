'use client'
import Link from 'next/link'
import styles from './HeaderLink.module.css'
import { usePathname } from 'next/navigation'

export default function HeaderLink(props){
    const pathname = usePathname()

    return(
        <Link href={props.href} className={pathname == props.href ? styles.purpleStyle : styles.blackStyle}>
            {props.children}
        </Link>
    )
}