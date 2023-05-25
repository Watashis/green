import { ReactComponent as MenuIcon } from './menu.svg';
import styles from './menu.module.css'


export default function Menu(){
    return <div className={styles.menu}>
        <MenuIcon/>
    </div>
}