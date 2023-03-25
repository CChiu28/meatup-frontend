import React from "react";
import CategoryDisplay from "./CategoryDisplay";

interface Props {
    getFilters: any,
    categories: string[],
    getCategoryFilters: any,
}

export default function YelpSidebar({getFilters, categories, getCategoryFilters}: Props) {

    function openSidebar() {

    }
    
    function dropDown() {

    }

    // function getPrice(e) {
    //     console.log(e)
    // }

    return(
        <aside className="sidebar fixed top-0 bottom-0 flex flex-col lg:left-0 p-2 mt-16 w-[300px] overflow-y-auto text-center bg-gray-500">
            <div className="text-gray-100 text-xl">
                <div className="p-2.5 mt-1 flex items-center justify-center">
                    <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600" />
                    <h1 className="font-bold text-gray-200 text-[15px] ml-3">TailwindCSS</h1>
                    <i className="bi bi-x cursor-pointer ml-28 lg:hidden" onClick={openSidebar} />
                </div>
                <div className="my-2 bg-gray-600 h-[1px]"></div>
            </div>
            {/* <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
                <i className="bi bi-search text-sm"></i>
                <input type="text" placeholder="Search" className="text-[15px] ml-4 w-full bg-transparent focus:outline-none" />
            </div>
            <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
                <i className="bi bi-house-door-fill"></i>
                <span className="text-[15px] ml-4 text-gray-200 font-bold">Home</span>
            </div>
            <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
                <i className="bi bi-bookmark-fill"></i>
                <span className="text-[15px] ml-4 text-gray-200 font-bold">Bookmark</span>
            </div>
            <div className="my-4 bg-gray-600 h-[1px]"></div>
            <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white" onClick={dropDown}>
                <i className="bi bi-chat-left-text-fill"></i>
                <div className="flex justify-between w-full items-center">
                <span className="text-[15px] ml-4 text-gray-200 font-bold">Chatbox</span>
                <span className="text-sm rotate-180" id="arrow">
                    <i className="bi bi-chevron-down"></i>
                </span>
                </div>
            </div>
            <div className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold" id="submenu">
                <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                Social
                </h1>
                <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                Personal
                </h1>
                <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                Friends
                </h1>
            </div>
            <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
                <i className="bi bi-box-arrow-in-right"></i>
                <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
            </div> */}
            <div>
                <h1 className="text-lg text-gray-200 font-bold">Filters</h1>
            </div>
            <span className="h-[1px] m-1 w-full bg-red-600"></span>
            <div className="btn-group justify-center m-1">
                <button className="btn" type="button" onClick={getFilters} name="price">$</button>
                <button className="btn" type="button" onClick={getFilters} name="price">$$</button>
                <button className="btn" type="button" onClick={getFilters} name="price">$$$</button>
                <button className="btn" type="button" onClick={getFilters} name="price">$$$$</button>
            </div>
            <span className="h-[1px] m-1 w-full bg-red-600"></span>
            <div>
                <div className="form-control">
                    <label className="label cursor-pointer m-auto">
                        <span className="label-text mr-1">Delivery</span> 
                        <input type="checkbox" className="checkbox msl-1" />
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer m-auto">
                        <span className="label-text mr-1">Pickup</span> 
                        <input type="checkbox" className="checkbox ml-1" />
                    </label>
                </div>
            </div>
            <span className="h-[1px] m-1 w-full bg-red-600"></span>
            {/* <div>
                {categories.map(cat => <button key={cat} type="button" className="rounded-full border p-2 m-1">{cat}</button>)}
            </div> */}
            <CategoryDisplay cats={categories} getCategoryFilters={getCategoryFilters} />
            <span className="h-[1px] m-1 w-full bg-red-600"></span>
            <div>
                <input type="radio" name="radio-1" className="" />
                <input type="radio" name="radio-1" className="" />
            </div>
        </aside>
    )
}