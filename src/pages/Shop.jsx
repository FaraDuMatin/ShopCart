import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

function Shop() {
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    // Check if products are already stored in localStorage
    const storedProducts = localStorage.getItem('shop-products');
    
    function fetchProductsFromAPI() {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setLoading(false);
          // Store in localStorage for future use
          localStorage.setItem('shop-products', JSON.stringify(data));
          // Initialize quantities
          setQuantities((prev) => {
            const newQuantities = { ...prev };
            data.forEach((product) => {
              newQuantities[product.id] = 1; // Set default quantity to 1
            });
            return newQuantities;
          });
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setLoading(false);
        });
    }
    if (storedProducts) {
      // Use cached data
      console.log('Using cached products');
      try {
        const parsedProducts = JSON.parse(storedProducts);
        setProducts(parsedProducts);
        setLoading(false);
        // Initialize quantities for cached products
        setQuantities((prev) => {
          const newQuantities = { ...prev };
          parsedProducts.forEach((product) => {
            newQuantities[product.id] = 1; // Set default quantity to 1
          });
          return newQuantities;
        });
      } catch (error) {
        console.error('Error parsing stored products:', error);
        // If parsing fails, fetch from API
        fetchProductsFromAPI();
      }
    } else {
      // No cached data, fetch from API
      fetchProductsFromAPI();
    }
  }, []);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="shop">
      <h1>Our Products</h1>
      <div className="products-grid">
        {products.map((product) => {
          const quantity = quantities[product.id] || 1;
          const handleAddToCart = () => {
            addItem(product, quantity);
            setQuantities((prev) => ({
              ...prev,
              [product.id]: 1
            })); // Reset quantity after adding
          };

          return (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h3>{product.title}</h3>
              <p className="price">${product.price}</p>
              <div className="quantity-controls">
                <button onClick={() => setQuantities((prev) => ({
                  ...prev,
                  [product.id]: Math.max(1, prev[product.id] - 1)
                }))}>
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1,   parseInt(e.target.value) || 1))
                  }
                />
                <button onClick={() => setQuantities((prev) => ({
                  ...prev,
                  [product.id]: (prev[product.id] || 1) + 1
                }))}>
                  +
                </button>
              </div>
              <button className="add-to-cart" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Shop;


