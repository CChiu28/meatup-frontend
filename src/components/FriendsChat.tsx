import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../App";

export default function FriendsChat(getFriendChat: any) {
    const [friends,setFriends] = useState<any[]>([]);
    const context = useContext(SidebarContext);

    useEffect(() => {
        const url = `http://localhost:8080/api/users/friends/${context.userId}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setFriends([...data]);
            })
    },[])
    
    return(
        <div className="h-5/6">
            {friends.map((friend,i) => {
                return(
                    <div key={i}>
                        {friend.uid}
                    </div>
                )
            })}
        </div>
    )
}