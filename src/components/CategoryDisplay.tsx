import React, { useState } from "react";

export default function CategoryDisplay({cats}: {cats: string[]}) {
    const [visible,setVisible] = useState(5);

    return(
        <div>
            {cats.slice(0,visible).map(cat => <button key={cat} type="button" className="rounded-full border p-2 m-1">{cat}</button>)}
            <br />
            {visible!==cats.length 
                ? <button onClick={() => setVisible(prev => prev = cats.length)}>More</button> 
                : <button onClick={() => setVisible(prev => prev = 5)}>Less</button>}
        </div>
    )
}