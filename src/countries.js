import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


export default function Countries () {
  const url = 'https://restcountries.com/v2/all';
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [q, setQ] = useState("");
  const [reg, setReg] = useState(["All"]);
  let bodyColor = document.body.classList == "dark";

  const search = (product) => {
    return product.filter((prod) => {
      if (prod.region == reg && prod.capital !== undefined) {
        return prod.name.toLowerCase().indexOf(q) > -1  || prod.capital.toLowerCase().indexOf(q) > -1
      } else if (reg == "All" && prod.capital !== undefined){
        return prod.name.toLowerCase().indexOf(q) > -1 || prod.capital.toLowerCase().indexOf(q) > -1
      }
    }
    )
  }
  
useEffect(() => {
    setLoading(true);
    axios.get(url)
    .then(response => {
        setProduct(response.data);
    })
    .catch((err) => {
        setError(err);
      })
    .finally(() => {
        setLoading(false);
      });
    
},[url]);

  const eventHandler = (e) => {
    let toLowerCase = e.target.value.toLowerCase();
    setQ(toLowerCase);
  }

  const filterReg = (e) => {
    setReg(e.target.value)
  }

  if (loading) {
    return <h1 className="pls-wait">Please Wait ...</h1>;
  }

  if (error || !Array.isArray(product)) {
    return <h1 className="pls-wait">Error Loading Data </h1>;
  }



  if (product) {
    return (
    
      <>
        <div className="search-bar">

        <div className="search">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon"/>
        <input value={q} id="val" onChange={eventHandler} type="text" placeholder="Search for a country..."></input>
        </div>

        <div className="filter-bar">
          <select onChange={filterReg}>
            <option value="All">Filter By Region</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Americas">Americas</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
        </select>
        </div>

</div>  
      <div className="big-container">
        {search(product).map(({name, capital, region, population, flag}) => (
            <Link to={`/${name}`} key={name}>
                <article id={name} className="container" style={{color: bodyColor ? "white" : "black", backgroundColor: bodyColor ? "hsl(210, 23%, 25%)" : "white"}}>
                    <img src={flag} alt="img"></img>
                  <div className="details">
                    <h1 className="">{name}</h1>
                    <p className="">Population: <span>{population.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></p>
                    <p className="">Region: <span>{region}</span> </p>
                    <p className="">Capital: <span>{capital}</span></p>
                    </div>
              </article>
              </Link>
              ))}
        </div>
        </>
    )
  };

  return (
    <div>
      
    </div>
  )
}

