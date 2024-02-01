import styles from './AddLawyerToCaseInput.module.css'
import getLawyerByEmail from '@/utils/API/getLawyerByEmail';
import { useState, useEffect } from 'react';

export default function SearchBar({newCaseLawyer, setNewLawyer}){

    const [timer, setTimer] = useState(null);
    const [lawyerEmail, setLawyerEmail] = useState('')
    const [lawyers, setLawyers]= useState()

    useEffect(() => {
        console.log("novo lawyerEmail: " +lawyerEmail)
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(async() => {
            if (lawyerEmail.length > 2){
                const lawyersFiltered = await getLawyerByEmail(lawyerEmail);
                console.log("Lawyer foram buscados: ", lawyersFiltered)
                setLawyers(lawyersFiltered)
            }
            else{
                setLawyers(null)
            }
        }, 500);
        setTimer(newTimer);

        // Função de limpeza do useEffect para cancelar o timer
        return () => {
            if (newTimer) {
                clearTimeout(newTimer);
            }
        };
    }, [lawyerEmail]);

    useEffect(() => {
        console.log("Lawyer mudou: ", lawyers)
    }, [lawyers]);

    return(
        <div className={styles.searchBarDiv}>
            <input type="text" placeholder={'Email do Advogado'} className={styles.input} value={lawyerEmail} onChange={(e)=>setLawyerEmail(e.target.value)}/>
            <div className={styles.hiddenOptions}>
                <ul className={styles.buttonsUl}>
                    {lawyers && lawyers.map(lawyer => (
                        <button className={styles.lawyerOption} key={lawyer.id} onClick={()=>setNewLawyer(lawyer)}>{lawyer.email}</button>
                    ))}
                </ul>
            </div>
        </div>
    )
}
