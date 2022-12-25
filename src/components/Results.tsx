import React, { useState, useEffect } from "react";
import { json, useLocation } from "react-router-dom";
import Rating from "./Rating";
import YelpSidebar from "./YelpSidebar";
import { getTime } from "../utils";

type funcProps = {
    searchResults: {
        search: string,
        location: string,
    }
}

export default function Results({searchResults}: funcProps) {
    const [biz,setBiz] = useState({
        businesses: [{
            id: "",
            name: "",
            url: "",
            image_url: "",
            rating: 0,
            categories: [{title: ""}]
        }],
        region: [],
        total: 0
    });
    const loc = useLocation();

    useEffect(() => {
        const obj = JSON.stringify(loc.state);
        console.log(obj)
        if (!(loc.state.location==''&&loc.state.search==='')) {
            fetch('http://meatup-env.eba-ayfxsx9m.us-east-1.elasticbeanstalk.com/api/search', {
                method: 'POST',
                headers: {
                    "Content-type":"application/json",
                    'Accept': 'application/json',
                    // 'Access-Control-Allow-Origin': '*'
                },
                body: obj,
            })
                .then(data => data.json())
                .then(body => {
                    if (body.status!=500)
                        setBiz(body);
                })
                .catch(err => console.error("bad error", err));
        }
    },[loc])

    return(
        <div className="container flex">
            <YelpSidebar />
            <div className="container relative">
                {biz.businesses.map((business) => {
                    if (business) {
                        return(
                            <div key={business.id} className="card lg:card-side h-fit justify-center items-center border border-neutral-800 bg-base-100 hover:shadow-xl m-3">
                                <figure className="w-1/3"><img className="object-fill"src={business.image_url} alt="Album"/></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{business.name}</h2>
                                    <Rating rating={business.rating}/>
                                    <div className="flex-row">
                                        {business.categories.map(cat => <span key={cat.title} className="m-1 p-1 bg-gray-300 rounded-md">{cat.title}</span>)}
                                    </div>
                                    <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Listen</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
                )}
            </div>
        </div>
    )
}