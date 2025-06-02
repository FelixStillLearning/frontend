import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(`http://localhost:5000/products/${id}`);
            setName(response.data.name);
            setPrice(response.data.price);
            setStock(response.data.stock);
        };
        fetchProduct();
    }, [id]);

    async function updateProduct(e) {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/products/${id}`, {
                name,
                price,
                stock
            });
            navigate("/products");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={updateProduct}>
                    <div className="field">
                        <label className="label">Name </label>
                        <div className="control">
                            <input type="text" className="input" value={name}
                                onChange={(e) => setName(e.target.value)} placeholder="name" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Price</label>
                        <div className="control">
                            <input type="text" className="input" value={price}
                                onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Stock </label>
                        <div className="control">
                            <input type="text" className="input" value={stock}
                                onChange={(e) => setStock(e.target.value)} placeholder="Stock" />
                        </div>
                    </div>
                    <div className="field">
                        <button type='submit' className='button is-success'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default EditProduct;