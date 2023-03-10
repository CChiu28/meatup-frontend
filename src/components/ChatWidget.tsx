import React, { useContext, useEffect, useRef, useState } from "react";
import { MainContainer, ChatContainer, ConversationHeader, MessageList, MessageInput, Message } from "@chatscope/chat-ui-kit-react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { SidebarContext } from "../App";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, onSnapshot, collection, getDocs } from "firebase/firestore";
import app from "../Firebase";
import { getTime } from "../utils";

interface ChatProps {
    userName: string | null,
    business: string | boolean,
}
export default function ChatWidget({userName, business}: ChatProps) {
    const [messages,setMessages] = useState<any>();
    const auth = getAuth();
    const context = useContext(SidebarContext);
    // const unsub = onSnapshot(doc(db,"chatrooms",""));

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        console.log(context.userId,business)
        if (business!=="") {
            const obj = JSON.stringify({
                businessId: business,
                chatroomId: "5AsOM2VGz2",
                user: userName,
                content: null
            })
            // const db = getFirestore(app);
            // const unsub = onSnapshot(doc(db,"chatrooms",`${business}`), (doc) => {
            //     console.log(doc.data());
            // });
            // const res = await fetch(`https://meatup-env.eba-ayfxsx9m.us-east-1.elasticbeanstalk.com/api/getAllMsg`, {
            fetch("https://meatup-cmdt.onrender.com/api/getAllMsg", {
            // fetch(`http://localhost:8080/api/getAllMsg`, {
                signal,
                method: "POST",
                body: obj,
                headers: {
                    "content-type": "application/json",
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setMessages(data);
                });
        }
        return () => {
            console.log("aborted")
            controller.abort();
        }
    },[business])

    async function sendMsg(e: string) {
        console.log(e)
        const date = new Date().getTime();
        console.log(context.userId, context.user)
        const obj = {
            businessId: business,
            chatroomId: "5AsOM2VGz2",
            content: {
                userid: context.userId,
                username: context.user,
                time: date,
                body: e
            }
        }
        // await fetch(`https://meatup-env.eba-ayfxsx9m.us-east-1.elasticbeanstalk.com/api/sendMsg`, {
        const res = await fetch("https://meatup-cmdt.onrender.com/api/sendMsg", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "content-type": "application/json",
            }
        });
        const data = await res.json();
        console.log(userName)
        setMessages(data);
    }

    return(
        <div className="h-5/6">
            <MainContainer>
                <ChatContainer>
                    <ConversationHeader>
                        <ConversationHeader.Content userName={context.user} />
                    </ConversationHeader>
                    <MessageList>
                        {messages && messages.map((el: any) =>
                            <Message key={el.time} model={{
                                message: el.body,
                                sentTime: el.time.toString(),
                                sender: el.user,
                                direction: (el.userid===context.userId ? "outgoing" : "incoming"),
                                position: "single",
                            }}>
                                <Message.Footer sender={el.username} sentTime={getTime(el.time)} />
                            </Message>
                        )}
                    </MessageList>
                    <MessageInput placeholder="Enter a message" onSend={sendMsg} autoFocus />
                </ChatContainer>
            </MainContainer>
        </div>
    )
}