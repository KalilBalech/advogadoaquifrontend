'on client'

import { useState } from 'react'
import styles from './IconAndInput.module.css'
import Image from 'next/image'

export default function IconAndInput({alt, src, srcOnHover, label, state, setState, placeholder}){
    const [isFocused, setInFocused] = useState(false)
    return(
        <div className={styles.iconAndInputDiv}>
            <Image alt={alt} src={src} width={60} height={60} className={`${styles.defaultImage} ${isFocused ? styles.displayNone : ''}`}></Image>
            <Image alt={alt} src={srcOnHover} width={60} height={60} className={`${styles.onHoverImage} ${isFocused ? styles.displayBlock : ''}`}></Image>
            <label className={styles.label}>{label}</label>
            <input className={styles.input} 
            type="text" 
            placeholder={placeholder} 
            value={state ? state : ''}
            onFocus={()=>setInFocused(true)}
            onBlur={()=>setInFocused(false)}
            onChange={(e)=>{setState(e.target.value)}}/>
        </div>
    )
}