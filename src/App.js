import './App.css';
import { BrowserRouter as Router, Routes, 
  Route} from "react-router-dom";
import Header from "./header";
import Countries from "./countries";
import Country from "./country"


const App = () => {


    return (
      <Router>
        <main>
        <Header />
        <Routes>
          <Route exact path="/" element={<Countries/>}></Route>
          <Route exact path="/:name" element={<Country />}> </Route>
        </Routes>
        </main>
      </Router>
    );
  }

export default App;
