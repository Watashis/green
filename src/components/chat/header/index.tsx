import { ChatType } from "../../../modules/Entity"
import styles from './header.module.css'


export default function Header(props: ChatType) {
    return <div className={styles.header}>
        <div className={styles.ava}></div>
        <div>
            <div>{props.Name}</div>
            <div>{props.ChatId==props.Name?"":props.ChatId}</div>
        </div>
    </div>
}