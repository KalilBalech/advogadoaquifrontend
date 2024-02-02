import Link from 'next/link'
import { useState } from 'react'
import styles from './HeaderIcon.module.css'
import Image from 'next/image'

export default function HeaderIcon({onClick, alt, src, href}){

    return(
        <Link href={href} onClick={()=>onClick()}>
            <Image alt={alt} src={src} width='60' height='60'></Image>
        </Link>
    )
}