import React ,{useEffect} from 'react';
import './App.css';
 
function App() {

  // This effect makes the whole ui responsive.
   useEffect(()=>{
      const resizer =   window.addEventListener("resize",()=>{
        let body = document.querySelector("#root");
    
        body.style.width = window.innerWidth+"px";
        body.style.height = window.innerHeight+"px";
        })
     
        return ()=>{
            window.removeEventListener(resizer);

        }
    
  },[])

  useEffect(()=>{
    let body = document.querySelector("#root");
  
    body.style.width = window.innerWidth+"px";
    body.style.height = window.innerHeight+"px";
},[])
  return (
      <form id="logIn">
             <input className=" el logInEl"/>
            <input className="el logInEl" type= "password"/>
            <button type="submit">Submit</button>
        </form>
  );
}

export default App;
