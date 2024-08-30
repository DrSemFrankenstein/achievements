import "./App.css";
import AppBar from "./Components/AppBar";
import AboutComponent from "./Components/AboutComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoComponent from "./Components/TodoComponent";

function App() {
  return (
    <>
      <AppBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/profile" element={<AboutComponent />} />
          <Route path="/goals" element={<TodoComponent />} />
          <Route path="/settings" element={<h1>Settings</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
