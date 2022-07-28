import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import {useParams, useNavigate} from "react-router-dom";

export default function Country() {

    const [country, setCountry] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    let {name} = useParams();
    let navigate = useNavigate();
    const url = `https://restcountries.com/v2/name/${name}`;

    useEffect(() => {
        setLoading(true);
        axios.get(url)
        .then(response =>{
            setCountry(response.data);
        })
        .catch((err) => {
            setError(err);
          })
        .finally(() => {
            setLoading(false);
          });
        
},[name]);


    if (loading) {
        return <h1 className="pls-wait">Please Wait ...</h1>;
      }
    
    if (error || !Array.isArray(country)) {
        return <h1 className="pls-wait">There was an error loading your data!</h1>;
      }

    if (country) {
    return (
        <div>
            {country.map(({name, flag, nativeName, population, region, subregion, capital, topLevelDomain, currencies, languages, borders, alpha3Code}) => (
                <div key={name} className="country-container"> 
                   <ul>
                       <div className="img-container">
                            <button className="back-button" onClick={() => navigate(-1)}><i className="gg-arrow-left"></i>Back</button>
                            <img className="country-img" src={flag} alt="img"></img>
                       </div>
                       <div className="country-details">
                            <h1>{name}</h1>
                            <p>Capital: {capital}</p>
                            <p>Native name: <span>{nativeName}</span></p>
                            <p>Population: <span>{population.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></p>
                            <p>Region: <span>{region}</span></p>
                            <p>Sub-Region: <span>{subregion}</span></p>
                            <p>Top level domain: <span>{topLevelDomain}</span></p>
                            <p>Currencies: <span>{currencies[0].code}</span></p>
                            <p>Languages: <span>{languages[0].name}</span></p>
                            <p>Alpha <span>{alpha3Code}</span></p>
                            <ul>Border Countries: {Array.isArray(borders) ? borders.map((border) => (
                                <li className="borders" key={border}>{border}</li>
                                )) : <span> none</span>}  
                            </ul>
                       </div>
                   </ul>
                </div> 
                ))
            } 
        </div>
    )
        }

    return (
            <div></div>
        )
        
}

