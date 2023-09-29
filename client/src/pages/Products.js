import {useEffect, useState} from 'react'
import Axios from 'axios'
import Product from '../components/Product'
import AddProduct from '../components/AddProduct'

export default function Products(){

    const [productList, setProductList] = useState()

    function removeProductWithId(productId) {
        console.log(productId)
        // remove from database
        Axios.delete("http://localhost:3002/removeFinanceProductWithId/"+productId).then ((response) => {
            // remove from productList
            console.log("Removed")

        })
    }

    useEffect(()=>{
        Axios.get("http://localhost:3002/getFinanceProducts").then( (response) => {
            setProductList(response.data)
            console.log(response.data)
        })
    }, [])
    
    return (



        <div className=' '>
            <div>
            <AddProduct />

            </div>

            <div className='grid grid-cols-1 justify-center	gap-2 mt-5'>
            {productList && (
                productList.map( (product) => {
                    return (<Product key={product._id} product={product} removeProductWithId={removeProductWithId}/>)
                })
            )}
            </div>
        </div>
    )

}