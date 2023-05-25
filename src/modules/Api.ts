import { MessageType as msgt, MessageHistory } from "./Entity";
type MessageType = msgt & {
    from: string,
    chatId: string
}

export default class Api {
    Instance: string;
    Token: string;
    updateChatList: Function | null;
    updated: boolean;
    constructor(Instance: string, Token: string) {
        this.updateChatList = null;
        this.Instance = Instance;
        this.Token = Token;
        this.updated = true;
        if (this.Token != '' && this.Instance != '') {
            setInterval(() => {
                if (this.updateChatList != null && this.updated) {
                    this.getNotifications();
                }
            }, 500)
        }
    };
    setUpdateChatList(updateChatList: Function) {
        this.updateChatList = updateChatList;
    }
    parceDate(timestamp: number) {
        let date = new Date(timestamp * 1000);
        let dateNow = new Date().toLocaleDateString("ru")
        let dateCurrent = date.toLocaleDateString("ru")
        if (dateNow == dateCurrent) {
            return date.toLocaleTimeString()
        }
        return dateCurrent;
    }
    async getNotifications(): Promise<void> {
        this.updated = false;
        let res = await fetch(`https://api.green-api.com/waInstance${this.Instance}/ReceiveNotification/${this.Token}`)
        let datatoParce = await res.json();
        if (datatoParce != null) {
            try {
                if (datatoParce.body.messageData.typeMessage != "reactionMessage") {
                    let data: MessageType = {
                        toMe: true,
                        text: datatoParce.body.messageData.textMessageData.textMessage,
                        date: this.parceDate(datatoParce.body.timestamp),
                        from: datatoParce.body.senderData.chatName,
                        chatId: datatoParce.body.senderData.chatId.split("@")[0]
                    }
                    if (this.updateChatList != null) {
                        this.updateChatList(data);
                    }
                }
            }
            catch { }
            this.deleteNotification(datatoParce.receiptId);
        }
        this.updated = true;

    };
    async deleteNotification(id: string) {
        await fetch(`https://api.green-api.com/waInstance${this.Instance}/deleteNotification/${this.Token}/${id}`, { method: "DELETE" })

    }
    async sendMessage(chatId: string, message: string) {
        let data = {
            "chatId": chatId,
            "message": message
        }
        if (chatId.indexOf("@") == -1) {
            data.chatId += '@c.us';
        }
        let send = await fetch(`https://api.green-api.com/waInstance${this.Instance}/SendMessage/${this.Token}`, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    }
    async getMessages(chatId: string) {
        let msgs = await fetch(`https://api.green-api.com/waInstance${this.Instance}/getChatHistory/${this.Token}`, {
            method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                "chatId": `${chatId}@c.us`,
                "count": 50
            })
        })
        let data: MessageHistory[] = await msgs.json();
        data = data.filter(m => m.typeMessage == "textMessage")
        return data.map(message => {
            return {
                toMe: message.type == "incoming",
                text: message.textMessage,
                date: this.parceDate(message.timestamp)
            }
        }).reverse();
    }
}
export type { MessageType }