import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { SidebarContext } from '../App';

export default function Friends() {
    const auth = getAuth();
    const context = useContext(SidebarContext);
    const [user,setUser] = useState<string>(context.userId);
    const [friends,setFriends] = useState<any[]>([]);

    useEffect(() => {
        // onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //     console.log(user.uid)
        //         setUser(user.uid);
        //     }
        // })

            const url = `http://localhost:8080/api/users/friends/${user}`;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setFriends([...data]);
                })
    },[])

    return(
        <div className='container mx-auto'>
            {friends.map((friend,index) => {
                return(
                    <div key={index} className="card lg:card-side shadow-lg">
                        <figure>
                            <img src={friend.photoUrl} />
                        </figure>
                        <div className='card-body'>
                            <h2 className='card-title'>{friend.displayName}</h2>
                            <p>{friend.email}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}