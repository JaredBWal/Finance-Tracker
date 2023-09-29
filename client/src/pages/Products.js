import {useEffect, useState} from 'react'
import Axios from 'axios'
import Product from '../components/Product'
import AddProduct from '../components/AddProduct'
import YearlyCosts from '../components/YearlyCosts'

export default function Products(){

    const [productList, setProductList] = useState()
    const [annualCost, setAnnualCost] = useState()

    function addToProductList(product){
        console.log(product)
        setProductList([...productList, product])
    }

    function updateProductLists(product){
        console.log(product);
        for (let i=0; i<productList.length; i++){
            console.log(productList[i]._id);
            if (productList[i]._id === product._id){
                let list = productList.slice(0,i)
                const backList = productList.slice(i+1)
                console.log(backList)
                list.push(product)
                if (backList.length > 0){
                    console.log("ADDING");
                    list = list.concat(backList)
                }
                console.log("UPDATED");
                console.log(list);

                
               setProductList(list)
               break;
            }
        }
        
    }


    function removeProductWithId(productId) {
        console.log(productId)
        // remove from database
        Axios.delete("http://localhost:3002/removeFinanceProductWithId/"+productId).then ((response) => {
            // remove from productList
            console.log(productId)
            for (let i=0; i<productList.length; i++){
                console.log(productList[i]._id);
                if (productList[i]._id === productId){
                    let first_half = productList.slice(0,i)
                    let back_half = productList.slice(i+1)

                    if (back_half.length > 0){
                        first_half = first_half.concat(back_half)
                    }

                    console.log(first_half)
                    setProductList(first_half)    
                    break;
                }
            }

        })
    }

    useEffect(()=>{
        Axios.get("http://localhost:3002/getFinanceProducts").then( (response) => {
            setProductList(response.data)
            console.log(response.data)
        })
    }, [])

    useEffect(()=>{
        console.log("CHANGED");
        calculateAnnualCost()
    }, [productList])

    function calculateAnnualCost(){
        if (productList){
            let totalCost = 0
            productList.map( (product) => {
                totalCost += product.cost * product.annual_occurrence
            })

            setAnnualCost(totalCost)
        }
    }
    
    return (

        <div className=' '>

            
            <div className='w-[60%] mx-auto mt-5 bg-cyan-950 p-3 rounded-md'>
                <AddProduct addToProductList={addToProductList}/>
            </div>
            <div className='mt-5'>     
                    <YearlyCosts key={1} annualCost={annualCost}/>
            </div>

            <div className='grid grid-cols-1 justify-center	gap-2 mt-5'>
                {productList && (
                    productList.map( (product) => {
                        return (<Product  key={product._id} product={product} removeProductWithId={removeProductWithId} setProductList={setProductList} updateProductLists={updateProductLists}/>)
                    })
                )}

            </div>


        </div>
    )

}