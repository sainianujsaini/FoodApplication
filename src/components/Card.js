import React, { useState ,useRef ,useEffect} from 'react'
import {useDispatchCart , useCart} from './ContextReducer'
import { Link } from 'react-router-dom'

export default function Card(props) {
        let dispatch = useDispatchCart();
        let data = useCart();
        const priceRef = useRef();
        let options = props.options;
        let priceOptions = Object.keys(options);
        const [qty, setQty] = useState(1);
        const [size, setSize] = useState("");
        const handleAddToCart = async()=>{
                await dispatch({type : "ADD" , id:props.foodItem._id, name:props.foodItem.name , price:finalPrice , qty:qty,size:size});
                console.log(data);
        }
        let finalPrice = qty*parseInt(options[size]);
        useEffect(()=>{
            setSize(priceRef.current.value)
        },[])

    return (
        <div>
            
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img className="card-img-top" src={props.foodItem.img} alt="Card image cap" style={{ minHeight: "180px", maxHeight: "180px", objectFit: "cover" }} />
                    <div className="card-body"> 
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        {/* <p className="card-text">This is a card.</p> */}
                        <div className="container w-100">
                            <select className="m-2 h-150 bg-success rounded" onChange = {(e)=>{setQty(e.target.value)}}>
                                {
                                    Array.from(Array(6), function (e, i) {
                                        return (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        )
                                    })}
                            </select>
                            <select className="m-2 h-150 bg-success rounded" ref = {priceRef} onChange = {(e)=>{setSize(e.target.value)}}>
                                {priceOptions.map((data)=>{
                                    // console.log(data);
                                    return <option key = {data} value = {data}>{data}</option>})}
                            </select>
                            <div className="d-inline fs-5">₹{finalPrice}/-</div>
                            <hr/>
                            <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add to Cart</button>

                        </div>
                        
                    </div>
                </div>



            

        </div>
    )
}
// when we have to create a function which reflect changes to some other pages which are childern or other then we have to use props
// so there we use context because otherwise we have to send the complete button information individually 
// so we use context and wrap it with context provider
// useReducer -> 