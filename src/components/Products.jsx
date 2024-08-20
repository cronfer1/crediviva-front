import React, { useContext } from "react";
import Product from "./Product";
import AppContext from "../context/AppContext";
import "../styles/components/Products.css";

const Products = () => {
  const { state, addToCart, removeFromCart,deleteFromCart } = useContext(AppContext);
  const { products, cart } = state;
  const handleAddToCart = (product) => () => {
    addToCart(product);
  };
  const handleRemoveFromCart = (product) => () => {
    removeFromCart(product);
  };

  const handleDeleteFromCart = (product) => () => {
    deleteFromCart(product);
  };


  const countOccurrences = (array1, array2) => {
    return array1.map(obj1 => {
      const count = array2.filter(obj2 => obj2.id === obj1.id && obj2.nombre === obj1.nombre).length;
      return { ...obj1, count };
    });
  };

  const newProducts = countOccurrences(products, cart);

  // console.log("newCart ",newCart)
  return (
    <div className="Products">
      <div className="Products-items">
        {newProducts.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
            handleDeleteFromCart={handleDeleteFromCart}
          />
        ))}
      </div>
    </div>
  );
};
export default Products;
