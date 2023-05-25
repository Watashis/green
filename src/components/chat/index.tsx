import Header from "./header"
import MessagesList from "./messagesList"
import Input from "./messageInput"
import { ChatType, MessageType } from "../../modules/Entity"
import styles from './chat.module.css'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"

type props = ChatType & {
    sendMessage: Function
}

const Chat = forwardRef((props: props, ref: any) => {
    const MessagesRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
        setMessages: setMessages,
        addMessage:(msg:MessageType)=>MessagesRef.current?.addMessage(msg),
        getChatId:props.ChatId
    }))

    const setMessages = (messages: any) => {
        MessagesRef.current?.setMessages(messages);
    }
    const sendMessage = (message: string) => {
        let msg: MessageType = { toMe: false, text: message, date: new Date().toLocaleTimeString() };
        if (message == "test") {
            msg.toMe = true;
        }
        MessagesRef.current?.addMessage(msg);
        props.sendMessage(message);
    }

    return <div className={styles.chat}>
        <Header ChatId={props.ChatId} Name={props.Name} />
        <MessagesList ref={MessagesRef} />
        <Input sendMessage={sendMessage} />
    </div>
})
export default Chat;