import styles from './main.module.css'
import Search from '../../components/search'
import Empty from '../../components/empty'
import { useRef, useState } from 'react'
import Chat from '../../components/chat'
import { useEffect } from 'react'
import { ChatItem, ChatItemProps } from '../../components/chatitem'
import Api from '../../modules/Api'
import { MessageType as MsgTypeFromApi } from '../../modules/Api'
import { useLocation, useNavigate } from 'react-router-dom'

type props = {
    Instance: string,
    Token: string
}

export default function MainPage() {
    const [chat, setChat] = useState<ChatItemProps | null>(null)
    const [chats, setChats] = useState<ChatItemProps[]>([])
    const navigator = useNavigate();
    const location: props = useLocation().state;
    const chatRef = useRef<any>(null);
    const Instance = location == null ? '' : location.Instance;
    const Token = location == null ? '' : location.Token
    const api = new Api(Instance, Token);
    const escFunction = (e: any) => {
        if (e.key == "Escape") {
            if (chat != null) {
                setChat(null);
            }
        }
    }
    const sendMessage = (msg: string) => {
        if (chat != null) {
            api.sendMessage(chat?.ChatId, msg)
        }
    }

    const updateChatList = (message: MsgTypeFromApi) => {
        let _chat = chats.filter(chat => chat.ChatId == message.chatId);
        if (_chat.length == 0) {
            setChats([...chats, {
                ChatId: message.chatId,
                Name: message.from,
                message: message.text,
                date: message.date,
                setChat: setChat
            }])
        } else {
            let chatId = chats.indexOf(_chat[0]);
            let _chats = chats;
            _chats[chatId] = {
                ChatId: message.chatId,
                Name: message.from,
                message: message.text,
                date: message.date,
                setChat: setChat
            }
            setChats(_chats)
        }
        try {
            let chatid = chatRef.current?.getChatId;
            if (chatid == message.chatId) {
                chatRef.current?.addMessage(message);
            }
        }
        catch { }
    }

    const getMessages = async () => {
        if (chat != null) {
            let messages = await api.getMessages(chat.ChatId);
            chatRef.current?.setMessages(messages);
        }
    }

    useEffect(() => {
        api.setUpdateChatList(updateChatList);
        if (location == null) {
            navigator("/login")
        }
    }, [])
    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction])

    useEffect(() => {
        getMessages();
    }, [chat])



    return <div className={styles.main}>
        <div className={styles.chatlist}>
            <Search setChat={setChat} setChats={setChats} />
            <div>
                {chats.map((chat, i) => <ChatItem key={i}>{chat}</ChatItem>)}
            </div>
        </div>
        {chat == null ?
            <Empty /> : <Chat ChatId={chat.ChatId} Name={chat.Name} sendMessage={sendMessage} ref={chatRef} />}
    </div>
}