import { useEffect, useState } from "react"


export default function YearlyCosts(props){





    return (
        <div className="w-[40%] mx-auto bg-green-400 p-6 rounded-md">
            <div className="text-xl">

                <h1>Annual Cost: {props.annualCost}</h1>
            </div>
        </div>
    )

}
