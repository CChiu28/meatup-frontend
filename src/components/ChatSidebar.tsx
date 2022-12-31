import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SidebarContext } from "../App";
import ChatWidget from "./ChatWidget";

interface props {
    showSidebar: boolean,
    closeSidebar: (bid: string|boolean, bizName: string) => void
}
export default function ChatSidebar({showSidebar,closeSidebar}: props) {
    // const [businessIdsetShowSidebar] = useState(false);
    const [show,setShow] = useState<string|null>(null);
    const context = useContext(SidebarContext);

    function setClose() {

    }

    return(
        <div>
            <div className={`top-0 right-0 w-[35vw] bg-gray-600 p-10 pl-6 text-white fixed h-full z-40 ease-in-out duration-300 
                    ${showSidebar ? "translate-x-0 " : "translate-x-full"}`}>
                <button className="flex text-4xl text-white items-center cursor-pointer mt-8 z-50" onClick={() => closeSidebar(false,"")}>
                    x
                </button>
                <h3 className="mt-3 text-4xl font-semibold text-white">
                    {context.businessName}
                </h3>
                <ChatWidget business={context.businessId} userName={context.user} />
            </div>
        </div>
    )
}