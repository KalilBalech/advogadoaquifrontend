import styles from './DetailsSideCardDiv.module.css'

export default function DetailsSideCardDiv({children, selectedModel}){
    return(
        <div className={`${styles.rollingCardDiv} ${selectedModel!=null ? styles.rollingCardIn : ''}`}>
            {children}    
        </div>
    )
}