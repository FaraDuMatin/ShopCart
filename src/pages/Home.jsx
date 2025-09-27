import { Link } from "react-router";
import { Store } from 'lucide-react';


function Home() {
  return (
    <div className="home">
      <h1>Welcome to Our Shop</h1>
      <p>Discover amazing products in our shopping cart application!</p>
      <div className="hero-section">
        <Store className="hero-image" />
        <p>Browse our <Link to="/shop">shop</Link> to find great deals and add items to your cart.</p>
      </div>
    </div>
  );
}

export default Home;