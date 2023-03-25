import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Rating from "./Rating";
import YelpSidebar from "./YelpSidebar";
import { getTime } from "../utils";
import checkIcon from "../assets/check.svg";
import crossIcon from "../assets/x.svg";
import ChatSidebar from "./ChatSidebar";
import { SidebarContext } from "../App";
import { getAuth } from "firebase/auth";

interface Businesses {
    businesses: {
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
    }[],
    region: any[],
    total: number
}

export default function Results() {
    const [biz,setBiz] = useState<Businesses>();
    const [showSidebar,setShowSidebar] = useState<boolean>(false);
    const bizRef = useRef<Businesses>();
    const transactions: string[] = ["delivery","pickup"];
    const category = useRef<string[]>([]);
    const loc = useLocation();
    const auth = getAuth();
    const navigate = useNavigate();
    const context = useContext(SidebarContext);

    useEffect(() => {
        let obj;
        console.log(loc.state)
        if (loc.state.location) {
            obj = JSON.stringify(loc.state);
        } else {
            console.log(loc.state.search)
            const bod = {
                search : loc.state.search,
                latitude : context.position[0],
                longitude : context.position[1],
            }
            obj = JSON.stringify(bod);
        }
        console.log(obj)
        if (!(loc.state.location==''&&loc.state.search==='')) {
            // fetch('https://meatup-env.eba-ayfxsx9m.us-east-1.elasticbeanstalk.com/api/search', {
                fetch('https://meatup-cmdt.onrender.com/api/search', {
            // fetch('http://localhost:8080/api/search' , {
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
                    if (body.status!=500) {
                        if (category.current.length!==0)
                            category.current = [];
                        body.businesses.map((business: { categories: []; }) => {
                            business.categories.forEach((cat: { title: string; }) => {
                                if (!category.current.includes(cat.title))
                                    category.current.push(cat.title);
                            })
                        })
                        bizRef.current = body;
                        setBiz(body);
                    }
                })
                .catch(err => console.error("bad error", err));
        }
    },[loc])

    function getFilter(e: { target: { name: string | number; textContent: string; }; }): void {
        console.log(e.target.textContent, e.target.name);
        if (bizRef.current) {
            const newBiz = bizRef.current.businesses.filter(business => {
                type objKey = keyof typeof business;
                const property = e.target.name as objKey;
                return business[property] === e.target.textContent;
            })
            setBiz(prevState => {
                return {
                    businesses: newBiz,
                    region: prevState!.region,
                    total: prevState!.total
                }
        });
        }
    }

    function getCategoryFilters(e: { target: any; }): void {
        console.log(e, bizRef.current);
        if (bizRef.current) {
            const newBiz = bizRef.current.businesses.filter(business => {
                type objKey = keyof typeof business;
                const property = e.target.name as objKey;
                const cats = business[property] as { title: string; }[];
                const biz = cats.filter(cat => {
                    return cat.title === e.target.textContent;
                })
                console.log(biz)
            })
            // console.log(newBiz)
        }
    }

    function getBusiness(id: string) {
        navigate(`/results/${loc.state.search}/${id}`, {
            state: {
                id: id,
            }
        })
    }

    function showChatWindow(bid: string | boolean, bizName: string) {
        context.businessName = bizName
        setShowSidebar(!showSidebar);
        context.businessId = bid;
    }

    return(
        <div className="flex">
            <ChatSidebar showSidebar={showSidebar} closeSidebar={showChatWindow}/>
            <YelpSidebar getFilters={getFilter} getCategoryFilters={getCategoryFilters} categories={category.current} />
            <main className="flex flex-col justify-center ml-[300px]">
                <div className="m-1 p-1">
                    <h1 className="text-5xl">{loc.state.search} around {loc.state.location}</h1>
                </div>
                {biz && biz.businesses.map((business) => {
                    return(
                        <div key={business.id} className="card lg:card-side h-80 border border-neutral-800 bg-base-100 hover:shadow-xl m-3 hover:cursor-pointer">
                            <div className="flex rounded-md" onClick={() => getBusiness(business.id)}>
                                <figure className="w-1/3 m-3">
                                    <img className="w-full h-full"src={business.image_url} alt="Album"/>
                                </figure>
                                <div className="card-body p-4">
                                    <h2 className="card-title text-3xl m-1 p-2 border rounded-md max-w-max">{business.name}</h2>
                                    <div className="flex justify-start m-1">
                                        <Rating rating={business.rating}/>
                                        <span>{business.review_count}</span>
                                    </div>
                                    <div className="flex-row">
                                        {business.categories.map(cat => <span key={cat.title} className="m-1 p-2 bg-gray-300 rounded-md">{cat.title}</span>)}
                                        {business.price!==null && (<span className="bg-gray-300 m-1 p-2 rounded-md">{business.price}</span>)}
                                    </div>
                                    <div className="flex flex-col bg-gray-300 p-2 m-1 rounded-md max-w-max">
                                        {business.location.display_address.map((add,index) => <span key={index}>{add}</span>)}
                                        {business.display_phone}
                                    </div>
                                    <div className="flex">
                                        {transactions.map(transaction => 
                                            <div key={transaction} className="flex m-1 p-1 bg-gray-300 rounded-md justify-center">
                                                <span className="m-1">{transaction}</span>
                                                <img className="w-1/5 object-scale-down m-1" src={business.transactions.includes(transaction) ? checkIcon : crossIcon} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="card-actions justify-end">
                                {auth.currentUser
                                    ? <button className="btn btn-primary" onClick={() => showChatWindow(business.id,business.name)}>Chat!</button>
                                    : <span>Sign in to chat!</span>}
                            </div>
                        </div>
                    )
                })}
            </main>
        </div>
    )
}