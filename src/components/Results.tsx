import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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
        }],
        region: [],
        total: 0
    });
    const loc = useLocation();

    useEffect(() => {
        const obj = JSON.stringify(loc.state);
        console.log(obj)
        if (!(loc.state.location==''&&loc.state.search==='')) {
            fetch('http://meatup-env.eba-ayfxsx9m.us-east-1.elasticbeanstalk.com/search', {
                method: 'POST',
                headers: {
                    "Content-type":"application/json",
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
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
        <div className="container">
            {biz.businesses.map((business: { name: string; id: any; url: string; image_url: string; }) => {
                if (business) {
                    return(
                        <div key={business.id} className="card lg:card-side border border-neutral-800 bg-base-100 shadow-xl m-3">
                            <figure className="w-1/4"><img className="object-fill"src={business.image_url} alt="Album"/></figure>
                            <div className="card-body">
                                <h2 className="card-title">{business.name}</h2>
                                <p>Click the button to listen on Spotiwhy app.</p>
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
    )
}