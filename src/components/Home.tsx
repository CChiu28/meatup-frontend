import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocationContext, SidebarContext } from "../App";

const categories: string[] = ['Restaurants','Shopping','Nightlife','Active Life','Beauty & Spas','Automotive','Home Services','Coffee','Food','Pets','Education','Financial Services'];

export default function Home({ setError = (boolean:boolean) => {} }: any) {
    const navigate = useNavigate();
    const context = useContext(SidebarContext);
    const locContext = useContext(LocationContext);

    function handleClick(e: React.BaseSyntheticEvent) {
        console.log(locContext);
        if (locContext.loc.length!==0) {
            const search = e.target.textContent;
            navigate(`/results/${search}`, {
                state: {
                    search: search,
                    location: locContext.loc,
                }
            })
        } else setError(true);
    }

    return(
        <div className="container mx-auto p-5 grid grid-cols-4 gap-4 justify-items-stretch h-[50vh]">
            {categories.map((cat,index) => {
                return(
                    <div key={index} onClick={handleClick}
                        className="flex rounded-2xl border-2 justify-around items-center w-full h-full hover:shadow-xl"
                    >
                        {cat}
                    </div>
                );
            })}
        </div>
    )
}