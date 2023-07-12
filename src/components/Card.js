import React from 'react'
import { Link } from 'react-router-dom'

export default function card() {
    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img className="card-img-top" src="https://source.unsplash.com/random/900×700/?grapes" alt="Card image cap" style = {{maxHeight:"230px"}} />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a card.</p>
                        <div className="container w-100">
                            <select className="m-2 h-150 bg-success rounded">
                                {
                                    Array.from(Array(6), function (e, i) {
                                        return (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        )
                                    })}
                            </select>
                            <select className="m-2 h-150 bg-success rounded">
                                <option value="half">Half</option>
                                <option value="full">Full</option>
                            </select>
                            <div className="d-inline fs-5">Total Price</div>
                        </div>

                    </div>
                </div>



            </div>

        </div>
    )
}
