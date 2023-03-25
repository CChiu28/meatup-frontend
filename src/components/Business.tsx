import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
    }[]
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
            const res = await fetch(`https://meatup-cmdt.onrender.com/api/business`, {
                // const res = await fetch('http://localhost:8080/api/business' , {
                method: 'POST',
                body: loc.state.id,
            });
            const data = await res.json();
            setBiz(data);
        })();
    },[])

    return(
        <div className="container flex flex-col">
            <div>
                <h1>{biz && biz.name}</h1>
            </div>
        </div>
    )
}