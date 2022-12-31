import React, { useContext, useEffect, useState } from "react";
import { getAuth, GithubAuthProvider, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider, AuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { SidebarContext } from "../App";

interface User {
    name: string | null,
    photoUrl: any
}
export default function Login() {
    const auth = getAuth();
    const gitLogin = new GithubAuthProvider();
    const googleLogin = new GoogleAuthProvider();
    const [user, setUser] = useState<User|null>();
    const context = useContext(SidebarContext);

    useEffect(() => {
        onAuthStateChanged(auth,(user) => {
            if (user) {
                console.log(user.photoURL)
                user.displayName ? context.user = user.displayName : context.user = user.email;
                context.userId = user.uid;
                setUser({
                    name: user.displayName,
                    photoUrl: user.photoURL,
                })
            } else setUser(null);
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
            <>
                {/* <li onClick={async () => await signIn(gitLogin)}>
                    <a className="justify-between">Github</a>
                </li>
                <li onClick={async () => await signIn(googleLogin)}>
                    <a className="justify-between">Google</a>
                </li> */}
                <li>
                    <label htmlFor="my-modal-4" className="justify-beween">open modal</label>
                </li>
            </>
        )
    }

    async function signIn(provider: AuthProvider) {
        const res = await signInWithPopup(auth,provider);
        console.log(res.user)
    }

    function handleLogin(e: React.BaseSyntheticEvent<SubmitEvent>) {
        e.preventDefault();
        signInWithEmailAndPassword(auth,e.target[0].value,e.target[1].value);
    }

    return(
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img src={user ? `${user.photoUrl}` : "https://placeimg.com/80/80/people"} />
                </div>
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                {signedInStatus()}
            </ul>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <ul className="menu">
                        <li onClick={async () => await signIn(gitLogin)}>
                            <a className="justify-between">Github</a>
                        </li>
                        <li onClick={async () => await signIn(googleLogin)}>
                            <a className="justify-between">Google</a>
                        </li>
                        <li>
                            <form className="flex flex-col" onSubmit={handleLogin}>
                                <input type="email" placeholder="email" name="email" className="input border-inherit" />
                                 <input type="password" placeholder="password" name="password" className="input border-inherit" />
                                 <button className="btn">Log In</button>
                            </form>
                        </li>
                    </ul>
                </label>
            </label>
        </div>
    )
}