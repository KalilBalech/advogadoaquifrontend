import styles from './AddLawyerToCaseInput.module.css'
import getLawyerByEmail from '@/utils/API/getLawyerByEmail';
import { useState, useEffect } from 'react';

export default function SearchBar({newCaseLawyer, setNewCaseLawyer}){

    const [timer, setTimer] = useState(null);
    const [lawyerEmail, setLawyerEmail] = useState('')
    const [suggestedLawyerList, setSuggestedLawyerList]= useState()

    useEffect(() => {
        console.log("novo lawyerEmail: " +lawyerEmail)
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(async() => {
            if (lawyerEmail.length > 2){
                const lawyersFiltered = await getLawyerByEmail(lawyerEmail);
                console.log("Lawyer foram buscados: ", lawyersFiltered)
                setSuggestedLawyerList(lawyersFiltered)
            }
            else{
                setSuggestedLawyerList(null)
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
        console.log("suggestedLawyerList mudou: ", suggestedLawyerList)
    }, [suggestedLawyerList]);

    return(
        <div className={styles.searchBarDiv}>
            <input type="text" placeholder={'Email do Advogado'} className={styles.input} value={lawyerEmail} onChange={(e)=>setLawyerEmail(e.target.value)}/>
            <div className={styles.hiddenOptions}>
                <ul className={styles.buttonsUl}>
                    {suggestedLawyerList && suggestedLawyerList.map(lawyer => (
                        <button className={styles.lawyerOption} key={lawyer.id} onClick={()=>setNewCaseLawyer(lawyer)}>{lawyer.email}</button>
                    ))}
                </ul>
            </div>
        </div>
    )
}
