import './App.css';
import React, {useState} from 'react';

export default function Header () {

    const [mode, setMode] = useState(true);

    const toggleDarkTheme = () => {
        let containers = document.querySelectorAll(".container");
        document.body.classList.toggle("dark");
        setMode(!mode);
        
        if (mode){
        containers.forEach((container => {
            container.classList.add("container-dark");
            container.classList.remove("light");
        }))
        } else if (!mode){
            containers.forEach((container => {
                container.classList.remove("container-dark");
                container.classList.add("light");

            }))        
        }   
    } 
    

    return (

        <div className="mode-bar">
        <h2>Where is the world?</h2>
        <button style={{color: mode ? 'black' : 'white'}} className="switch-button" onClick={() => toggleDarkTheme()} dangerouslySetInnerHTML={{__html: mode ? '<i class="gg-moon"></i> Dark mode' : '<i class="gg-sun"></i> Light mode'}}></button>
      </div>
        )
    
}

