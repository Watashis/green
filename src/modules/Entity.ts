type ChatType ={
    ChatId:string,
    Name:string
}
type MessageType = {
    toMe:boolean,
    text:string,
    date:string
}
type MessageHistory={
    chatId:string,
    idMessage:string,
    senderId:string,
    senderName:string,
    textMessage:string,
    timestamp:number,
    type:string,
    typeMessage:string
}
export type {ChatType,MessageType,MessageHistory}