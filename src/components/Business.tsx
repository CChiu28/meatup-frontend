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
    reviews: Reviews,
}

interface Reviews {
    total: number,
    reviews: {
        id: string,
        url: string,
        text: string,
        rating: number,
        time_created: string,
        user: {
            id: string,
            image_url: string,
            name: string,
        }
    }[]
}

export default function Business() {
    const loc = useLocation();
    const [biz, setBiz] = useState<biz>();
    // const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    useEffect(() => {
        (async () => {
            // const res = await fetch(`https://meatup-cmdt.onrender.com/api/business`, {
            const business = await fetch(`https://meatup-backend-production.up.railway.app/api/business`, {
            // const business = await fetch('http://localhost:8080/api/business' , {
                method: 'POST',
                body: loc.state.id,
            });
            const reviews = await fetch('https://meatup-backend-production.up.railway.app/api/reviews', {
            // const reviews = await fetch('http://localhost:8080/api/reviews', {
                method: 'POST',
                body: loc.state.id,
            })
            const businessData = await business.json();
            const reviewData = await reviews.json();
            console.log(reviewData)
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
                        <div className="card shadow-md border border-inherit p-5 m-3 flex flex-row">
                            <div className="flex flex-col">
                                {biz.business.location.display_address.map((address,i) => <span key={i}>{address}</span>)}
                                {biz.business.display_phone}
                            </div>
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
                        <div>
                            <ul className="border border-inherit rounded-xl shadow-md p-5 m-3">
                                {biz.reviews.reviews.map((review,i) => {
                                    return(
                                        <li key={i} className="p-3">
                                            <div className="card lg:card-side p-3 shadow-md border border-inherit block h-4/5">
                                                <div className="h-fit">
                                                    <div className="avatar rounded-full">
                                                        <figure className="w-[10%]">
                                                            <img src={review.user.image_url} />
                                                        </figure>
                                                    </div>
                                                    {review.user.name}
                                                    <Rating rating={review.rating} />
                                                    {review.time_created}
                                                </div>
                                                <div>
                                                    <span>{review.text}</span>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}