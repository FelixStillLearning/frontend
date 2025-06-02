import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AddProduct = () => {
const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [stock, setStock] = useState("");
const navigate = useNavigate(); 
 async function saveProduct(e) {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/products', {
                name,
                price,
                stock
            });
            navigate("/products")
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="columns mt-5 is-centered">
    <div className="column is-half">
        <form onSubmit={saveProduct}>
            <div className="field">
                <label className="label">Name </label>
                <div className="control">
                    <input type="text" className="input" value={name} 
                    onChange={(e)=> setName(e.target.value)} placeholder="name"/>
                </div>
            </div>
            <div className="field">
                <label className="label">Price</label>
                <div className="control">
                    <input type="text" className="input" value={price} 
                    onChange={(e)=> setPrice(e.target.value)}  placeholder="Price"/>
                </div>
            </div>
            <div className="field">
                <label className="label">Stock </label>
                <div className="control">
                    <input type="text" className="input" value={stock} 
                    onChange={(e)=> setStock(e.target.value)}  placeholder="Stock"/>
                </div>
            </div>
             <div className="field">
               <button type='submit' className='button is-success'>Save</button>
            </div>
        </form>
    </div>

   </div>
  )
}

export default AddProduct;