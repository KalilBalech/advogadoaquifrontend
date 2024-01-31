'on client'
import styles from './DetailsSideBarArrowInfo.module.css'
import Image from 'next/image'
import arrowRightIcon from '@/public/arrowRightIcon.svg'
import { useState } from 'react'

export default function DetailsSideBarArrowInfo({children, title}){
    const [isOpen, setIsOpen] = useState(false)
    return(
        <div className={styles.arrowInfo}>
            <button className={styles.headerArrowInfo} onClick={()=>{setIsOpen(!isOpen)}}>
                <Image className={isOpen ? styles.imgArrowDown : ''} src={arrowRightIcon} alt='arrowRightIcon' width={20} height={20}/>
                <p>{title}</p>
            </button>
            {isOpen && children}
        </div>
    )
}