import {BrowserRouter, Routes, Route} from "react-router-dom"
import "./styles/index.scss"
import Products from "./components/Products/Products";
import Bucket from "./components/Bucket/Bucket";
import DetailedProductItem from "./components/DetailedProductItem/DetailedProductItem";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products/>}/>
        <Route path="/productItem" element={<DetailedProductItem/>}/>
        <Route path="/bucket" element={<Bucket/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
