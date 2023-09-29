import { useState } from "react"
import Axios from 'axios'

export default function AddProduct(props){


    const [editName, setEditName] = useState();
    const [editCost, setEditCost] = useState();
    const [editAnnual_occurrence, setEditAnnualOccurrence] = useState();

    function addProduct(){
        Axios.post("http://localhost:3002/createFinanceProduct", {
            name: editName,
            cost: editCost,
            annual_occurrence: editAnnual_occurrence
        }).then ((response) => {
            console.log(response.data)
            props.addToProductList(response.data)

            //reset variables
            setEditName("")
            setEditCost("")
        })
    }

return (

    <div className=" flex">
        <span  className="flex-1">
            <input  onChange={ (event) => {setEditName(event.target.value)} } value={editName} className="w-full" placeholder="Name" ></input>
        </span>
        <span className="flex-1 ml-1">
            <input onChange={ (event) => {setEditCost(event.target.value)} }  value={editCost} className="w-full " placeholder="Cost" ></input> 
        </span>
        <span className="flex-1 ml-1">
            <select  onChange={ (event) => {setEditAnnualOccurrence(event.target.value)} } className="w-full  py-[.5px]" >
                <option value={"None"} selected disabled hidden>{"Occurrence"}</option>
                <option value="365">Daily</option>
                <option value="52">Weekly</option>
                <option value="12">Monthly</option>
                <option value="1">Yearly</option>
            </select>
        </span>
        <span className="flex-1 ml-1">
            <button onClick={addProduct} className="w-full hover:bg-gray-300 rounded-md bg-gray-200 text-gray-800">Add Financial Product</button>
        </span>
    </div>
)

}