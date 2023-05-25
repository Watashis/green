import { ReactComponent as CheckIcon } from './check.svg';
import styles from './message.module.css'

type props = {
    toMe:boolean,
    text:string,
    date:string
}

export default function Message(props:props) {
    const style = props.toMe ? styles.message : styles.messageF;
    return <div className={styles.messageBox}>
        <div className={style}>
            <div>{props.text}</div>
            <div className={styles.add}>{props.date} <CheckIcon /></div>
        </div>
    </div>
}