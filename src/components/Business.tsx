import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface Business {
    id: string,
    name: string,
    url: string,
    image_url: string,
    rating: number,
    categories: Array<{title: string}>,
    review_count: number,
    location: {
        display_address: Array<string>
    },
    display_phone: string,
    price: string,
    transactions: Array<string>,
    special_hours: Array<Time>,
    photos: Array<String>,
    hours: Array<{
        hours_type: string,
        is_open_now: boolean,
        open: Array<Time>
    }>
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
            const res = await fetch(`http://meatup-env.eba-ayfxsx9m.us-east-1.elasticbeanstalk.com/api/business/${loc.state.id}`, {
                method: 'POST'
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