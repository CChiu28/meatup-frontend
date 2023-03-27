import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Rating from "./Rating";
import { days, getTime, convert24To12 } from '../utils';
import dayjs from "dayjs";

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

interface biz {
    business: Business,
    reviews: Reviews[],
}

interface Reviews {
    total: number,
    reviews: []
}

export default function Business() {
    const loc = useLocation();
    const [biz, setBiz] = useState<biz>();
    // const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    useEffect(() => {
        (async () => {
            // const res = await fetch(`https://meatup-cmdt.onrender.com/api/business`, {
            const business = await fetch('http://localhost:8080/api/business' , {
                method: 'POST',
                body: loc.state.id,
            });
            const reviews = await fetch('http://localhost:8080/api/reviews', {
                method: 'POST',
                body: loc.state.id,
            })
            const businessData = await business.json();
            const reviewData = await reviews.json();
            console.log(businessData)
            setBiz({
                    business: businessData,
                    reviews: reviewData,
            });
        })();
    },[])

    return(
        <>
            {biz &&
                <div>
                    <div className="relative flex flex-row w-full shadow-md border border-inherit rounded-md">
                            {biz.business.photos.map((pic,index) => {
                                return(
                                    <figure key={index} className="flex w-full brightness-50">
                                        <img src={pic} className="object-cover"/>
                                    </figure>
                                )
                            })}
                            <div className="absolute bottom-10 left-32 w-auto border border-red-500">
                                <h1 className="text-5xl text-white font-extrabold">{biz.business.name}</h1>
                                <div className="flex justify-start m-1 w-auto">
                                    <Rating rating={biz.business.rating}/>
                                    <span>{biz.business.review_count}</span>
                                </div>
                            </div>
                    </div>
                    <div className="container mx-auto flex flex-col">
                        <table className="border border-inherit">
                            <thead>
                                <tr className="bg-slate-300">
                                    <th className="border border-inherit ">Day</th>
                                    <th className="border border-inherit ">Operating hours</th>
                                </tr>
                            </thead>
                            <tbody>
                                {biz.business.hours.map((hour,i) =>
                                    hour.open.map((time,i) => {
                                        return(
                                            <tr key={i}>
                                                <td className="border border-inherit text-center">
                                                    {days[i]}
                                                </td>
                                                <td className="border border-inherit text-center">
                                                    {convert24To12(time.start)} - {convert24To12(time.end)}
                                                </td>
                                            </tr>
                                        )
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </>
    )
}