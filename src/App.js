// import logo from './logo.svg';

// import { DatePicker } from "antd";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Main from "./pages/Main";
import { useContext, useReducer } from "react";
import FirebaseContext, {  firebaseReducer, initState } from "./store/firebaseContext";

// import './App.css';

function App() {
  // const FirebaseContext = useContext(firebaseContext)
  const reducer = useReducer(firebaseReducer, initState)
  return (
    <div className="App">
      <FirebaseContext.Provider value={reducer}>
        <Routes>
          <Route path="" element={<Home />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </FirebaseContext.Provider>
      {/* <DatePicker></DatePicker> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
