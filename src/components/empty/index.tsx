import styles from './empty.module.css'
import { ReactComponent as Logo } from './logo.svg';


export default function Empty() {
    return <div className={styles.main}>
            <span className={styles.logo}>
                <Logo />
            </span>
            <p className={styles.header}>WhatsApp API</p>
            <p className={styles.text}>Отправляйте и получайте сообщения, картинки и видео через стабильный шлюз WhatsApp API</p>
            <p className={styles.text}>Бесплатный инструмент для разработчиков</p>
            <p className={styles.text}>Зелёный свет Вашим Идеям!</p>
    </div>
}