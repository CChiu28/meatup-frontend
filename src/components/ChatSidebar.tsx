import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SidebarContext } from "../App";
import ChatWidget from "./ChatWidget";

interface props {
    showSidebar: string | null,
    closeSidebar: (bid: string|null) => void
}
export default function ChatSidebar({showSidebar, closeSidebar}: props) {
    // const [showSidebar,setShowSidebar] = useState(false);
    const [show,setShow] = useState<string|null>(null);
    // const loc = useLocation();
    const context = useContext(SidebarContext);

    // useEffect(() => {
    //     setShow(showSidebar)
    // },[])

    function setClose() {

    }

    return(
        <div>
            {/* {showSidebar 
                ? (<button className="flex text-4xl text-white items-center cursor-pointer fixed right-10 top-6 z-50" onClick={() => setShowSidebar(!showSidebar)}>
                    x
                </button>) 
                : (<svg onClick={() => setShowSidebar(!showSidebar)} className="sticky z-30 flex items-center cursor-pointer right-10 top-6"
                    fill="#2563EB"
                    viewBox="0 0 100 80"
                    width="40"
                    height="40">
                    <rect width="100" height="10"></rect>
                    <rect y="30" width="100" height="10"></rect>
                    <rect y="60" width="100" height="10"></rect>
                </svg>
            )} */}
            <div className={`top-0 right-0 w-[35vw] bg-gray-600 p-10 pl-20 text-white fixed h-full z-40 ease-in-out duration-300 
                    ${showSidebar ? "translate-x-0 " : "translate-x-full"}`}>
                <button className="flex text-4xl text-white items-center cursor-pointer mt-16 z-50" onClick={() => closeSidebar(null)}>
                    x
                </button>
                <h3 className="mt-20 text-4xl font-semibold text-white">
                    {showSidebar}
                </h3>
                <ChatWidget business={showSidebar} userName={context.user} />
            </div>
        </div>
    )
}