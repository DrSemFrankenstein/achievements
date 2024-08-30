import "./App.css";
import AppBar from "./Components/AppBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import AboutComponent from "./Components/Profile/AboutComponent";
import TodoComponent from "./Components/Goals/TodoComponent";

function App() {
  return (
    <>
      <AppBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/profile" element={<AboutComponent />} />
          <Route path="/goals" element={<TodoComponent />} />
          <Route path="/settings" element={<h1>Settings</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
