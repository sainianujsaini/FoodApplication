import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        const email = localStorage.getItem('userEmail');
        const response = await fetch("http://localhost:5000/api/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        if (response) {
            const data = await response.json();
            setOrderData(data.orderData.order_data);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                {orderData.length ? orderData.map((order, orderIndex) => (
                    <div key={orderIndex}>
                        {order[0].Order_date && (
                            <div className='row mt-5'>
                                <div className='col-12'>
                                    <h4>{order[0].Order_date}</h4>
                                    <hr />
                                </div>
                            </div>
                        )}

                        <div className='row d-flex flex-wrap'>
                            {order.map((item, itemIndex) => {
                                if (item.Order_date) {
                                    return null;
                                } else {
                                    return (
                                        <div key={itemIndex} className='col-12 col-md-6 col-lg-3'>
                                            <div className="card mt-3" style={{ width: "100%", maxHeight: "360px" }}>
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <div className='container w-100 p-0'>
                                                        <span className='m-1'>{item.qty}</span>
                                                        <span className='m-1'>{item.size}</span>
                                                        <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                            ₹{item.price}/-
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                )) : <p>No orders available</p>}
            </div>
            <Footer />
        </div>
    );
}
