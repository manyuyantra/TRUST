import React ,{useEffect} from 'react';
import './App.css';
 
function App() {
 return (
      <form id="logIn">
            <input  placeholder="NAME" className=" el logInEl"/>
            <input placeholder = "PASSWORD" className="el logInEl" type= "password"/>
            <button  className = "loginBtn"  type="submit">Submit</button>
        </form>
  );
}

export default App;
