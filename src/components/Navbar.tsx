import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LocationContext } from "../App";
import Login from "./Login";

export default function Navbar({ locationError, setLocationError }: {locationError: boolean, setLocationError:any}) {
    const navigate = useNavigate();
    const [error,setError] = useState(false);
    const context = useContext(LocationContext);

    useEffect(() => {
        setError(locationError);
    },[locationError])
    
    function handleInput(e: React.BaseSyntheticEvent<SubmitEvent>) {
        e.preventDefault();
        navigate(`/results/${e.target[0].value}`, {
            state: {
                search: e.target[0].value,
                location: e.target[1].value
            }
        })
    }

    function changeError() {
        return error ? "border-red-600" : "border-inherit";
    }

    function handleChange(e:any) {
        context.setLocation(e.target.value);
        setLocationError(false);
    }

    return(
        <div className="navbar sticky top-0 z-50 border-b border-inherit bg-base-100 flex justify-between">
            <div>
                <Link className="btn btn-ghost normal-case text-xl" to="/">MeatUp</Link>
            </div>
            <div className="form-control">
                <form className="input-group" onSubmit={handleInput}>
                    <input type="text" placeholder="Search" name="search" className="input border-inherit" required/>
                    <input type="text" placeholder="Location" name="location" className={`input transition-colors ${changeError()}`} onChange={handleChange} required/>
                    <button className="btn btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </form>
            </div>
            <Login />
        </div>
    )
}