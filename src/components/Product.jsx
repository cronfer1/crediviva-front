import React from "react";
import AddDelete from "./AddDeleteProduct";
const Product = ({ product, handleAddToCart,handleRemoveFromCart,handleDeleteFromCart }) => {
 
  return (
    <div className="Products-item">
      <figure>
        <img src={product.image} alt={product.title} />
        <div className="Products-item-info">
          <figcaption>{product.descripcion}</figcaption>
          <h2>
            {product.nombre}
            <span>${product.price}</span>
          </h2>
        </div>
      </figure>
      <div className="Products-item-button">
        <AddDelete product={product} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart} handleDeleteFromCart={handleDeleteFromCart}/>
      </div>

      {/* <button type="button" onClick={handleAddToCart(product)}>
        Comprar
      </button> */}
    </div>
  );
};

export default Product;
