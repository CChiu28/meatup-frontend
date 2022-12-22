import React, { useEffect, useState } from "react";

type funcProps = {
    searchResults: {
        search: string,
        location: string,
    }
}
export default function Home({searchResults}: funcProps) {
    const [biz,setBiz] = useState({
        businesses: [{
            id: "",
            name: ""
        }],
        region: [],
        total: 0
    });

    useEffect(() => {
        const obj = JSON.stringify(searchResults);
        console.log(obj)
        if (!(searchResults.location==''&&searchResults.search==='')) {
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
    },[searchResults])

    return(
        <div className="container">
            {biz.businesses.map((business: { name: String; id: any; }) => {
                if (business) {
                    return(<div key={business.id}>
                        <span>{business.name}</span>
                    </div>)
                }
            }
            )}
        </div>
    )
}