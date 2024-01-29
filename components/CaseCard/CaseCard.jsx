"use client";
import styles from './CaseCard.module.css'
import { useState, useEffect } from 'react';
import axios from 'axios'
import MyIcon from '../MyIcon/MyIcon';
import Button from '../Button/Button'
import Loading from '../Loading/Loading'
import hashtagIcon from '@/public/hashtagIcon.svg'
import userIcon from '@/public/userIcon.svg'
import Image from 'next/image'

export default function Case(props){
    return(
        <button key={props.case.id} className={styles.caseDiv} onClick={() => {props.setSelectedCase(props.case)}}>
            <div className={styles.caseNameAndUpdateMessage}>
                <p className={styles.caseName}>{props.case.name}</p>
                <p className={styles.updateMessage}>{props.case.status != 'VIS' ? 'Movimentação' : ''}</p>
            </div>
            <div className={styles.iconAndInfoDiv}>
                <Image alt='Hashtag Icon' src={hashtagIcon} width='20' height='20'></Image>
                <p className={styles.caseNumber}>{props.case.number}</p>
            </div>
            {props.case.customers.length > 0 && <div className={styles.iconAndInfoDiv}>
                <Image alt='User Icon' src={userIcon} width='20' height='20'></Image>
                <p className={styles.caseCustomer}>{props.case.customers.map(customer => customer.name).join(', ')}</p>
            </div>}
        </button>
    )
}