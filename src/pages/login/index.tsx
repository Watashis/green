import { useRef } from 'react'
import styles from './login.module.css'
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const InstanceRef = useRef<HTMLInputElement>(null);
    const TokenRef = useRef<HTMLInputElement>(null);
    const navigator = useNavigate();
    const login = () =>{
        let instance = InstanceRef.current?.value;
        let token = TokenRef.current?.value;
        navigator("/", { state: { Instance: instance, Token: token } })
    }
    return <div className={styles.login}>
        <div className={styles.title}>Вход в WhatsApp(GREEN API)</div>
        <input placeholder='Instance' ref={InstanceRef}></input>
        <input placeholder='Token' ref={TokenRef}></input>
        <div className={styles.btn} onClick={login}>Войти</div>
    </div>
}