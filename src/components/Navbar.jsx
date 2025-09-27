import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';


function Navbar() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">ShopCart</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/cart" className="cart-link">
            <span className="cart-link-container" style={{ position: 'relative', display: 'inline-block' }}>
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="cart-count cart-count-top-left">{cartCount}</span>
              )}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;