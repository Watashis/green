import styles from './messages.module.css'
import Message from '../message'
import { MessageType } from '../../../modules/Entity'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

const MessagesList = forwardRef((props: any, ref: any) => {
    const [msgs, setMsgs] = useState<MessageType[]>([]);
    const bottomRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        getMessages: () => msgs,
        addMessage: (message: MessageType) => {
            let messages = msgs.filter(m=>{
                return m.date==message.date && m.text == message.text
            });
            if(messages.length==0){
                setMsgs([...msgs,message])
            }
        },
        setMessages: (messages: MessageType[]) => {
            setMsgs(messages)
        }
    }))

    useEffect(()=>{
        scroll();
    },[msgs]);

    const scroll = ()=>{
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    return <div className={styles.messages} >
        {msgs.map((message,i) =>
            <Message key={i} toMe={message.toMe} text={message.text} date={message.date} />)}
            <div ref={bottomRef} />
    </div>
})
export default MessagesList;