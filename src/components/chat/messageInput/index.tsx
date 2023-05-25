import { useRef } from 'react'
import styles from './input.module.css'



export default function Input(props: { sendMessage: Function }) {
    const inputRef = useRef<HTMLInputElement>(null)
    //sendMessage
    const sendMessage = (e:{keyCode:number})=>{
        if(e.keyCode==13){
            if(inputRef.current?.value!=null && inputRef.current?.value.length!=0){
                props.sendMessage(inputRef.current?.value);
                inputRef.current!.value ="";
            }
        }
    }
    return <div className={styles.input}>
        <input placeholder="Введите сообщение" ref={inputRef} onKeyUp={sendMessage}></input>
    </div>
}