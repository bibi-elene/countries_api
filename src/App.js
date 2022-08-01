import './App.css';
import { BrowserRouter as Router, Routes, 
  Route} from "react-router-dom";
import Header from "./header";
import Countries from "./countries";
import Country from "./country"
import React from 'react';


const App = () => {


    return (
      <React.StrictMode>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/countries_api" element={<Countries/>}></Route>
          <Route exact path="/:name" element={<Country />}> </Route>
        </Routes>
      </Router>
      </React.StrictMode>
    );
  }

export default App;
