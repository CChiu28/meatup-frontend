import React, { useContext, useEffect, useState } from "react";
import { MainContainer, ChatContainer, ConversationHeader, MessageList, MessageInput, Message } from "@chatscope/chat-ui-kit-react";
import { SidebarContext } from "../App";

interface ChatProps {
    userName: string | null,
    business: string | null,
}
export default function ChatWidget({userName, business}: ChatProps) {
    const [messages,setMessages] = useState<any>();
    const context = useContext(SidebarContext);

    useEffect(() => {
        (async () => {
            const obj = JSON.stringify({
                businessId: "b9Qd4jaxugk7Zo7LE_lLrg",
                chatroomId: "5AsOM2VGz2",
                user: "NCaZbyQ3GIhe9tw7tHRmsVQZCJt2",
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
            setMessages(data);
        })();
    },[])

    function objMap() {
        for (const property in messages) {
            console.log(messages[property])
        }
    }
    return(
        <MainContainer className="border">
            <ChatContainer>
                <ConversationHeader>
                    <ConversationHeader.Content userName={context.user} />
                </ConversationHeader>
                <MessageList>
                    {messages && objMap()}
                </MessageList>
                <MessageInput placeholder="test" />
            </ChatContainer>
        </MainContainer>
    )
}