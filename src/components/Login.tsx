import React, { useEffect, useState } from "react";
import { getAuth, GithubAuthProvider, onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";

interface User {
    name: string | null,
    photoUrl: any
}
export default function Login() {
    const auth = getAuth();
    const gitLogin = new GithubAuthProvider();
    const [user, setUser] = useState<User|null>();

    useEffect(() => {
        onAuthStateChanged(auth,(user) => {
            if (user)
                setUser({
                    name: user.displayName,
                    photoUrl: user.photoURL,
                })
            else setUser(null);
        })
    },[])

    function signedInStatus() {
        if (auth.currentUser) {
            return(
                <>
                    <li><span>{auth.currentUser.displayName}</span></li>
                    <li>
                        <a className="justify-between">
                            Profile
                            <span className="badge">New</span>
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li onClick={() => signOut(auth)}><a>Logout</a></li>
                </>
            )
        } else return(
            <li onClick={async () => await signIn()}>
                <a className="justify-between">Log In</a>
            </li>
        )
    }

    async function signIn() {
        const res = await signInWithPopup(auth,gitLogin);
        console.log(res.user)
    }

    return(
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img src={user ? user.photoUrl : "https://placeimg.com/80/80/people"} />
                </div>
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                {signedInStatus()}
            </ul>
        </div>
    )
}