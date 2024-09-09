import React, { useEffect, useState } from "react";

// required components on every page
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  // these are hooks
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");
  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    response = await response.json();
    setFoodItems(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade "
          data-bs-ride="carousel"
        >
          <div className="carousel-inner " id="carousel">
            <div class=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">
                <input
                  className="form-control me-2 w-75 bg-white text-dark"
                  type="search"
                  placeholder="Search in here..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <button
                  className="btn text-white bg-danger"
                  onClick={() => {
                    setSearch("");
                  }}
                >
                  X
                </button>
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://foodish-api.com/images/burger/burger6.jpg"
                className="d-block w-100  "
                style={{ filter: "brightness(90%)", maxHeight: "500px" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://foodish-api.com/images/pizza/pizza23.jpg"
                className="d-block w-100 "
                style={{ filter: "brightness(90%)", maxHeight: "500px" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://foodish-api.com/images/pasta/pasta16.jpg"
                className="d-block w-100 "
                style={{ filter: "brightness(90%)", maxHeight: "500px" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {
          foodCat.length != 0
            ? foodCat.map((data) => {
                return (
                  <div className="row mb-3">
                    <div key={data.id} className="fs-3 m-3">
                      {data.CategoryName}
                    </div>
                    <hr
                      id="hr-success"
                      style={{
                        height: "4px",
                        backgroundImage:
                          "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
                      }}
                    />
                    {/* filter the items from foodItems where it matches search text and data.CategoryName */}
                    {foodItems.length != 0 ? (
                      foodItems
                        .filter(
                          (items) =>
                            items.CategoryName === data.CategoryName &&
                            items.name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                        )
                        .map((filterItems) => {
                          return (
                            <div
                              key={filterItems.id}
                              className="col-sm-12 col-md-6 col-lg-4 "
                            >
                              <Card
                                foodItems={filterItems}
                                options={filterItems.options[0]}
                              />
                            </div>  
                          );
                        })
                    ) : (
                      <div> No Such Data </div>
                    )}
                  </div>
                );
              })
            : ""
        }
      </div>
      <Footer />
    </div>
  );
}
