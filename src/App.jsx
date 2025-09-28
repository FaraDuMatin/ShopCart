import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import "./App.css";
import DarkVeil from "./components/Darkveil";

function App() {
  return (
    <CartProvider>
      <Router basename="/ShopCart">
        <div className="App">
          <DarkVeil hueShift={24}/>
          <div className="app-content">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
