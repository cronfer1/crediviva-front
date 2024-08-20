import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import "../styles/components/AddDeleteProduct.css";

const AddDelete = ({ product, handleAddToCart, handleDeleteFromCart }) => {
    return (
        <div className="AddDelete">
            {product.count === 0 ?
                <button className="AddDelete-item-buy" type="button" onClick={handleAddToCart(product)} >
                    Comprar
                </button> :
                <div className="AddDelete-items">
                    <button className="AddDelete-item-minus" onClick={handleDeleteFromCart(product)}>
                        <i className="fa-solid fa-minus" />
                    </button>
                    <a> {product.count}</a>
                    <button className="AddDelete-item-plus" type="button" onClick={handleAddToCart(product)}>
                        <i className="fa-solid fa-plus" />
                    </button>
                </div>
            }
        </div>
    );
};

export default AddDelete;
