import React from "react";
import "./App.css";
import { useState } from "react";
import Header from "./Header";
function App() {
  let [products, setProduct] = useState([]);
  let [tempProducts,setTempProducts] = useState([]);
  const [filterOp, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const handleFilter = (event) => {
    const {value} = event.target
    setFilter(value)    
    const toShow = products.filter((x) => {
      return x.brand === value
    });
    if(sort==="rating"){
        toShow.sort((x,y)=>{
          return y.rating-x.rating
        })
        setTempProducts(toShow)

    }
    else if(sort ==="price"){
        toShow.sort((x,y)=>{
          return y.price-x.price
        })
        setTempProducts(toShow)
    }
    else
    setTempProducts(toShow);
  }
  const ratingSort =(event)=>{
    const {value} = event.target
    setSort(value)
    let toShow = tempProducts.slice(0,tempProducts.length);
    toShow.sort((x,y)=>{
      return y.rating-x.rating
    })
    setTempProducts(toShow)
  }
  const priceSort =(event)=>{
    const {value} = event.target
    setSort(value)
    let toShow = tempProducts.slice(0,tempProducts.length);
    toShow.sort((x,y)=>{
      return y.price-x.price
    })
    setTempProducts(toShow)
  }
  async function allProducts() {
    let res;
    res = await fetch("https://dummyjson.com/products");
    const json = await res.json();
    setProduct(json.products);
    setTempProducts(json.products);
  }

  const renderProduct = tempProducts.map((item) => {
    return (
      <div class="card" key={item.id} id="main">
            <h3>{item.title}</h3>
            <img src={item.images[0]} alt="avtar" ></img>
            <h4>Rating: {item.rating}</h4>
            <div >
               <h4>Price: ${item.price}</h4>
            </div>
        </div>
    );
  });
  const handleClick = () => {
    allProducts();
  };
  return (
    <div>
      <div class="btnn">
        <button class="click"
          onClick={handleClick}
        >
          Fetch Data
        </button>
      </div>
      <Header />
      <div></div>
      <div style={{justifyContent:"center"}}
        onChange={handleFilter}
      ><label>Filter By</label> <span style={{paddingRight:"20px"}}></span>
        <input  type="radio" checked={filterOp === 'Samsung'} value="Samsung"   /> Samsung
        <input  type="radio" checked={filterOp === 'Apple'} value="Apple"   /> Apple
        <input  type="radio" checked={filterOp === 'OPPO'} value="OPPO"   /> OPPO
      </div>
      <div class="space">
      <label>Sort By</label>
      <span style={{paddingRight:"20px"}}></span>
        <input type="radio" onChange={ratingSort} checked={sort === 'rating'} value="rating"   /> Rating
        <input type="radio" onChange={priceSort} checked={sort === 'price'} value="price"   /> Price
      </div>
      
      <button
          onClick={()=>{
            setFilter('');
            setSort('');            
            setTempProducts(products)
          }}
          style={{
            width:"100px",
            height:"50px",
            marginTop: "50px",
            outline: "none",
            border: "none",
            backgroundColor: "teal",
            opacity: ".7",
            borderRadius: "10px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Clear Filter
        </button>
      <div class="cardall" style={{ marginTop: "50px" }}>
        {tempProducts && renderProduct}
      </div>
    </div>
  );
}

export default App;
