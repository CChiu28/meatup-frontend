import React, { useContext, useEffect, useRef, useState } from "react";
import { MainContainer, ChatContainer, ConversationHeader, MessageList, MessageInput, Message } from "@chatscope/chat-ui-kit-react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { SidebarContext } from "../App";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface ChatProps {
    userName: string | null,
    business: string | boolean,
}
export default function ChatWidget({userName, business}: ChatProps) {
    const [messages,setMessages] = useState<any>();
    const auth = getAuth();
    const context = useContext(SidebarContext);

    useEffect(() => {
        renderMessages();
    },[business])

    async function renderMessages() {
        console.log(context.userId,business)
        if (business!=="") {
            const obj = JSON.stringify({
                businessId: business,
                chatroomId: "5AsOM2VGz2",
                user: userName,
                content: null
            })
            const res = await fetch(`http://meatup-env.eba-ayfxsx9m.us-east-1.elasticbeanstalk.com/api/getAllMsg`, {
            // const res = await fetch(`http://localhost:8080/api/getAllMsg`, {
                method: "POST",
                body: obj,
                headers: {
                    "content-type": "application/json",
                }
            });
            const data = await res.json();
            console.log(data);
            setMessages(data);
        }
    }

    async function sendMsg(e: string) {
        console.log(e)
        const date = new Date().getTime();
        console.log(date.toString())
        const obj = {
            businessId: business,
            chatroomId: "5AsOM2VGz2",
            content: {
                user: context.userId,
                time: date,
                body: e
            }
        }
        await fetch(`http://meatup-env.eba-ayfxsx9m.us-east-1.elasticbeanstalk.com/api/sendMsg`, {
            // const res = await fetch(`http://localhost:8080/api/sendMsg`, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "content-type": "application/json",
            }
        });
        renderMessages();
    }

    return(
        <div className="h-5/6">
            <MainContainer>
                <ChatContainer>
                    <ConversationHeader>
                        <ConversationHeader.Content userName={context.user} />
                    </ConversationHeader>
                    <MessageList>
                        {messages && messages.map((el: any) => <Message key={el.time} model={{
                                message: el.body,
                                sentTime: el.time.toString(),
                                sender: el.user,
                                direction: (el.user===context.userId ? "outgoing" : "incoming"),
                                position: "single",
                            }}>
                                <Message.Footer sender={el.user} sentTime={el.time.toString()} />
                            </Message>
                        )}
                    </MessageList>
                    <MessageInput placeholder="test" onSend={sendMsg} autoFocus />
                </ChatContainer>
            </MainContainer>
        </div>
    )
}