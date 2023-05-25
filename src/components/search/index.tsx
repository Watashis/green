import { ReactComponent as SearchIcon } from './search.svg';
import styles from './search.module.css'
import Menu from './menu';
import { ChatItemProps } from "../chatitem";
import { useRef } from 'react';

type props = {
    setChats:Function,
    setChat:Function
}

export default function Search(props:props) {
    const inputRef = useRef<HTMLInputElement>(null)
    const searchChats = () =>{
        let q = inputRef.current?.value;
        if(q!=null && q.length!=0){
            let chat:ChatItemProps[] = [{
                Name:q,
                ChatId:q,
                setChat:props.setChat,
                date:'',
                message:''
            }]
            props.setChats(chat);
        }
    }
    return <div className={styles.searchBox}>
        <div className={styles.search}>
            <SearchIcon />
            <input placeholder='Поиск или новый чат' ref={inputRef} onKeyUp={searchChats}></input>
        </div>
        <Menu />
    </div>
}