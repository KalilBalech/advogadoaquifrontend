import styles from './CaseCard.module.css'
import hashtagIcon from '@/public/hashtagIcon.svg'
import userIcon from '@/public/userIcon.svg'
import Card from '@/components/Card/Card'
import CardIconAndInfo from '@/components/CardIconAndInfo/CardIconAndInfo'

export default function CaseCard(props){
    return(
        <Card cardKey={props.case.id} model={props.case} setSelectedModel={props.setSelectedCase}>
            <div className={styles.caseNameAndUpdateMessage}>
                <p className={styles.caseName}>{props.case.name}</p>
                <p className={styles.updateMessage}>{props.case.status != 'VIS' ? 'Movimentação' : ''}</p>
            </div>
            <CardIconAndInfo alt='Hashtag Icon' src={hashtagIcon} info={props.case.number}/>
            <CardIconAndInfo alt='User Icon' src={userIcon} info={props.case.customers.length > 0 ? props.case.customers.map(customer => customer.name).join(', ') : ' ... '}/>
        </Card>
    )
}