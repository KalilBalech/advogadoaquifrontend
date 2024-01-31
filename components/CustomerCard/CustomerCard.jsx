import styles from './CustomerCard.module.css'
import emailIcon from '@/public/emailIcon.svg'
import phoneIcon from '@/public/phoneIcon.svg'
import Card from '@/components/Card/Card'
import CardIconAndInfo from '@/components/CardIconAndInfo/CardIconAndInfo'

export default function CustomerCard(props){
    return(
        <Card cardKey={props.customer.id} model={props.customer} setSelectedModel={props.setSelectedCustomer}>
            <div className={styles.caseNameAndUpdateMessage}>
                <p className={styles.caseName}>{props.customer.name}</p>
            </div>
            <CardIconAndInfo alt={'email Icon'} src={emailIcon} info={props.customer.email ? props.customer.email : ' ... '}/>
            <CardIconAndInfo alt={'phone Icon'} src={phoneIcon} info={props.customer.phoneNumber ? props.customer.phoneNumber : ' ... '}/>
        </Card>
    )
}