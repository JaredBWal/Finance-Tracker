import { useState } from "react";
import Axios from "axios";


// props takes in the product object
export default function Product(props){

    const [showEdit, setShowEdit] = useState(false)

    const [name, setName] = useState();
    const [cost, setCost] = useState();
    const [annual_occurrence, setAnnualOccurrence] = useState();

    const toggleShowEdit = () => {
        if (showEdit) {
            setShowEdit(false)
        }else{
            setShowEdit(true)
        }
    }

    const getStringOccurrence = (number) => {
        switch(number){
            case 1:
                return "Yearly"
            case 12:
                return "Monthly"
            case 52:
                return "Weekly"
            case 365:
                return "Daily"
        }
    }

     
    const editProduct = () => {
        Axios.patch("http://localhost:3002/editFinanceProduct",{
            _id : props.product._id,
            name: name, 
            cost: cost, 
            annual_occurrence: annual_occurrence
          }).then((response) =>{
            console.log(response)
        })
      }

    return(


        
        <div className="w-[40%] mx-auto bg-blue-400 p-6 rounded-md">
            <div className="text-xl">
                <h1>{props.product.name}: {props.product.cost}/{getStringOccurrence(props.product.annual_occurrence)}</h1>
            </div>
        
            <div className="w-full flex  justify-around mt-4">
                <div>
                    <button className=" bg-red-200 rounded-sm px-3 py-1" onClick={toggleShowEdit}>Edit</button>
                </div>
            <div>
                <button className="bg-red-200 rounded-sm px-3 py-1">Remove</button>
            </div>
        </div>

    {
        showEdit &&
    <div className="mt-2 flex">
        <span  className="flex-1">
            <input onChange={ (event) => {setName(event.target.value)} } className="w-full" placeholder={props.product.name} ></input>
        </span>
        <span className="flex-1 ml-1">
            <input onChange={ (event) => {setCost(event.target.value)} } className="w-full " placeholder={props.product.cost} ></input> 
        </span>
        <span className="flex-1 ml-1">
            <select onChange={ (event) => {setAnnualOccurrence(event.target.value)} } className="w-full  py-[.5px]" >
                <option value={props.product.annual_occurrence} selected disabled hidden>{getStringOccurrence(props.product.annual_occurrence)}</option>
                <option value="365">Daily</option>
                <option value="52">weekly</option>

                <option value="12">Monthly</option>
                <option value="1">Yearly</option>
            </select>
        </span>
        <span className="flex-1 ml-1">
            <button onClick={editProduct} className="w-full bg-gray-400">Save Edit</button>
        </span>
    </div>

    }
    
    
</div>

    )
}