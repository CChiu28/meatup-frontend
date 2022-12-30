import React, { useContext, useEffect, useRef, useState } from "react";
import { MainContainer, ChatContainer, ConversationHeader, MessageList, MessageInput, Message } from "@chatscope/chat-ui-kit-react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { SidebarContext } from "../App";

interface ChatProps {
    userName: string | null,
    business: string | boolean,
}
export default function ChatWidget({userName, business}: ChatProps) {
    const [messages,setMessages] = useState<any>();
    const messagesRef = useRef();
    const context = useContext(SidebarContext);

    useEffect(() => {
        (async () => {
            console.log(userName,business)
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
                console.log(data)
                messagesRef.current = data;
                setMessages(data);
            }   
        })();
    },[context.businessId])

    function objMap() {
        const listOfMessages = [];
        for (const property in messages) {
            for(const body in messages[property]) {
                listOfMessages.push({
                    message: messages[property][body],
                    sentTime: body,
                    sender: property,
                });
            }
        }
        return listOfMessages;
    }

    async function sendMsg(e: string) {
        console.log(e)
        const date = new Date().getTime();
        console.log(date.toString())
        const obj = {
            businessId: business,
            chatroomId: "5AsOM2VGz2",
            user: context.userId,
            content: {
                [date.toString()]: e,
            }
        }
        await fetch(`http://meatup-env.eba-ayfxsx9m.us-east-1.elasticbeanstalk.com/api/sendMsg`, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "content-type": "application/json",
            }
        });
    }

    return(
        <div className="h-5/6">
            <MainContainer>
                <ChatContainer>
                    <ConversationHeader>
                        <ConversationHeader.Content userName={context.user} />
                    </ConversationHeader>
                    <MessageList>
                        {messages && objMap().map(el => <Message key={el.sentTime} model={{
                                message: el.message,
                                sentTime: el.sentTime,
                                sender: el.sender
                            }}>
                                <Message.Footer sender={el.sender} sentTime={el.sentTime} />
                            </Message>
                        )}
                    </MessageList>
                    <MessageInput placeholder="test" onSend={sendMsg} autoFocus />
                </ChatContainer>
            </MainContainer>
        </div>
    )
}