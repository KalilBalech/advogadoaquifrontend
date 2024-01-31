'on client'
import { useState, useEffect } from 'react'
import styles from './CustomerCasesCard.module.css'
import putCaseAnnotation from '@/utils/API/putCaseAnnotation'

export default function CustomerCasesCard({caseItem, customerCases, setCustomerCases}){
    const [isOpen, setIsOpen] = useState(false)
    const [cardCase, setCardCase] = useState(caseItem)
    const [caseAnnotation, setCaseAnnotation] = useState(caseItem && caseItem.annotation)

    useEffect(()=>{
        if (cardCase) {
            console.log("Card Case foi alterado porque case annotation foi alterado: ", cardCase)
            const updatedCaseItens = customerCases.map(specificCase => 
            specificCase.id === caseItem.id ? caseItem : specificCase
          );
          setCustomerCases(updatedCaseItens);
          console.log("Customer CAses foi alterado porque cardCase foi alterado")
        }
      }, [cardCase])

    useEffect(()=>{
    if (caseAnnotation) {
        console.log("case annoatation foi alterado: ", caseAnnotation)
        setCardCase(currentCardCase=>{return {...currentCardCase, annotation:caseAnnotation}})
    }
    }, [caseAnnotation])

    return(
        <div className={styles.caseItemDiv}>
            <button className={styles.standardView} onClick={()=>{setIsOpen(!isOpen)}}>
                <div className={styles.header}>
                    <p className={styles.name}>{caseItem && caseItem.name}</p>
                    <p className={styles.status}>{caseItem && caseItem.status != 'VIS' ? 'Movimentações' : ''}</p>
                </div>
                <p className={styles.number}>{caseItem && caseItem.number}</p>
            </button>
            {isOpen && 
            <div className={styles.hiddenSection}>
                <p className={styles.atendimentop}>Atendimento</p>
                <textarea value={caseAnnotation ? caseAnnotation  : ''} 
                    placeholder='Registre o atendimento aqui' 
                    className={`${styles.inputContent}`} 
                    onChange={(e)=>{
                        putCaseAnnotation(caseItem.id, e.target.value)
                        setCaseAnnotation(e.target.value)
                    }}/>
            </div>
            }
        </div>
    )
}