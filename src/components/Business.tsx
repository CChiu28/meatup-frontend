import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Rating from "./Rating";

interface Business {
    id: string,
    name: string,
    url: string,
    image_url: string,
    rating: number,
    categories: {title: string}[],
    review_count: number,
    location: {
        display_address: string[]
    },
    display_phone: string,
    price: string,
    transactions: string[],
    special_hours: Time[],
    photos: string[],
    hours: {
        hours_type: string,
        is_open_now: boolean,
        open: Time[]
    }[],
    distance: number
}

interface Time {
    date: string,
    day: string,
    start: string,
    end: string,
    is_closed: boolean,
    is_overnight: boolean,
}

export default function Business() {
    const loc = useLocation();
    const [biz, setBiz] = useState<Business>();

    useEffect(() => {
        (async () => {
            // const res = await fetch(`https://meatup-cmdt.onrender.com/api/business`, {
                const res = await fetch('http://localhost:8080/api/business' , {
                method: 'POST',
                body: loc.state.id,
            });
            const data = await res.json();
            console.log(data)
            setBiz(data);
        })();
    },[])

    return(
        <>
            {biz &&
            <div>
                <div className="relative flex flex-row w-full shadow-md border border-inherit rounded-md">
                        {biz.photos.map((pic,index) => {
                            return(
                                <figure key={index} className="flex w-full brightness-50">
                                    <img src={pic} className="object-cover"/>
                                </figure>
                            )
                        })}
                        <div className="absolute bottom-10 left-32 w-auto border border-red-500">
                            <h1 className="text-5xl text-white font-extrabold">{biz.name}</h1>
                            <div className="flex justify-start m-1 w-auto">
                                <Rating rating={biz.rating}/>
                                <span>{biz.review_count}</span>
                            </div>
                        </div>
                </div>
                <div className="container mx-auto flex flex-col">
                </div>
            </div>
            }
        </>
    )
}