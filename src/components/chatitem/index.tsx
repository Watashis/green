import styles from './chatitem.module.css'
import { ChatType } from '../../modules/Entity';


type ChatItemProps = ChatType & {
    setChat: Function,
    message: string,
    date: string
}

function ChatItem(props: { children: ChatItemProps }) {
    let Props = props.children;
    return (<div className={styles.chatitem} onClick={() => Props.setChat(Props)}>
        <div className={styles.ava}>
        </div>

        <div className={styles.textBox}>
            <div className={styles.nameBox}>{Props.Name}
                <span className={styles.date}>{Props.date}</span>
            </div>
            <div className={styles.message}>{Props.message}</div>
        </div>
    </div>)
}
export { ChatItem };
export type { ChatItemProps };