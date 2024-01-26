import styles from './SearchCaseBar.module.css'
import Image from 'next/image'
import searchIcon from '@/public/searchIcon.svg'

export default function SearchCaseBar(){
    return(
        <div className={styles.searchBarDiv}>
            <button className={styles.button}>
                <Image alt='search icon' src={searchIcon} width='25' height='25'></Image>
            </button>
            <input type="text" placeholder='Número do processo' className={styles.input}/>
        </div>
    )
}