import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    function handleInput(e: React.BaseSyntheticEvent<SubmitEvent>) {
        e.preventDefault();
        navigate('/results', {
            state: {
                search: e.target[0].value,
                location: e.target[1].value
            }
        })
    }

    return(
        <div className="navbar sticky top-0 z-50 border-b border-inherit bg-base-100 flex justify-between">
            <div>
                <a className="btn btn-ghost normal-case text-xl">MeatUp</a>
            </div>
            <div className="form-control">
                <form className="input-group" onSubmit={handleInput}>
                    <input type="text" placeholder="Search" name="search" className="input border-inherit" />
                    <input type="text" placeholder="Location" name="location" className="input border-inherit" />
                    <button className="btn btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </form>
            </div>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img src="https://placeimg.com/80/80/people" />
                    </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                        <a className="justify-between">
                            Profile
                            <span className="badge">New</span>
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
            </div>
        </div>
    )
}