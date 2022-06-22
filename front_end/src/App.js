import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AbiturListFull from "./Abitur/AbiturListFull";
import BuisnessCard from "./pages/BuisnessCard";
import AbiturList from "./pages/AbiturListFull";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BuisnessCard />} />
        <Route path="abitur-extra/" element={<AbiturList/>} />
      </Routes>
    </Router>
  );
}

export default App;
