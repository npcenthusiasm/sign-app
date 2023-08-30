// import logo from './logo.svg';

// import { DatePicker } from "antd";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

// import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<Login />}></Route>
      </Routes>
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
