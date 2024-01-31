import styles from './Card.module.css'

export default function Card({children, setSelectedModel, model, cardKey}){
    return(
        <button key={cardKey} className={styles.cardDiv} onClick={() => {setSelectedModel(model)}}>
            {children}
        </button>
    )
}