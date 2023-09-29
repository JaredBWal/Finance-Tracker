import { useEffect, useState } from "react";
import Axios from "axios";


// props takes in the product object
export default function Product(props){

    const [showEdit, setShowEdit] = useState(false)

    const [name, setName] = useState();
    const [cost, setCost] = useState();
    const [annual_occurrence, setAnnualOccurrence] = useState();


    const [editName, setEditName] = useState();
    const [editCost, setEditCost] = useState();
    const [editAnnual_occurrence, setEditAnnualOccurrence] = useState();
    

    const toggleShowEdit = () => {
        if (showEdit) {
            setShowEdit(false)
        }else{
            setShowEdit(true)
        }
    }

    const getStringOccurrence = (number) => {
        // console.log(number)
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

    useEffect( () => {
        setName(props.product.name)
        setCost(props.product.cost)
        setAnnualOccurrence(props.product.annual_occurrence)
    }, [])

     
    const editProduct = () => {
        

        // if (editName){updateName = editName}
        // if (editCost){updateCost = editCost}
        // if (editAnnual_occurrence){updateAnnual_occurrence = editAnnual_occurrence}
        console.log("EDIT PRODUCT")
        console.log(props.product._id)

        Axios.patch("http://localhost:3002/editFinanceProduct",{
            id : props.product._id,
            name: editName, 
            cost: editCost, 
            annual_occurrence: editAnnual_occurrence
          }).then((response) =>{
            console.log(response)

            let updateName = name
            let updateCost = cost
            let updateAnnual_occurrence = annual_occurrence

            if (editName) { updateName=editName;  setName(editName)}
            if (editCost) { updateCost=Number(editCost); setCost(Number(editCost))}
            if (editAnnual_occurrence) {updateAnnual_occurrence=Number(editAnnual_occurrence); setAnnualOccurrence(Number(editAnnual_occurrence))}


            response.data.cost = Number(response.data.cost)

            let updated_product = {
                _id: props.product._id,
                name: updateName,
                cost: updateCost,
                annual_occurrence:updateAnnual_occurrence
            }

            props.updateProductLists(updated_product)
        })
      }


      function removeProductWithId(){
        console.log("removing")
      }

    return(

    
        
        <div className="w-[40%] mx-auto bg-blue-400 p-6 rounded-md">
            {/* {console.log(getStringOccurrence(annual_occurrence))} */}
            <div className="text-xl">
                <h1>{name}: {cost}/{getStringOccurrence(annual_occurrence)}</h1>
            </div>
        
            <div className="w-full flex  justify-around mt-4">
                <div>
                    <button className=" bg-red-200 rounded-sm px-3 py-1" onClick={toggleShowEdit}>Edit</button>
                </div>
            <div>
                <div>
                    <button className="bg-red-200 rounded-sm px-3 py-1" onClick={ () => {props.removeProductWithId(props.product._id)}}>Remove</button>
                </div>
            </div>
        </div>

    {
        showEdit &&
    <div className="mt-2 flex">
        <span  className="flex-1">
            <input  onChange={ (event) => {setEditName(event.target.value)} } className="w-full" placeholder={name} ></input>
        </span>
        <span className="flex-1 ml-1">
            <input onChange={ (event) => {setEditCost(event.target.value)} } className="w-full " placeholder={cost} ></input> 
        </span>
        <span className="flex-1 ml-1">
            <select  onChange={ (event) => {setEditAnnualOccurrence(event.target.value)} } className="w-full  py-[.5px]" >
                <option value={props.product.annual_occurrence} selected disabled hidden>{getStringOccurrence(annual_occurrence)}</option>
                <option value="365">Daily</option>
                <option value="52">Weekly</option>

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