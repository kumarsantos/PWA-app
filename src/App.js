import { Route, Routes } from "react-router-dom";
import NavBarComponent from "./Navbar";
import Home from "./Home";
import About from "./About";
import Users from "./Users";

function App() {
  return (
    <>
      <NavBarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;

//https://jsonplaceholder.typicode.com/users
