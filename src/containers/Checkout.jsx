import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../context/AppContext";
import "../styles/components/Checkout.css";
import AddDelete from "../components/AddDeleteProduct";

const Checkout = () => {
  const { state, addToCart, removeFromCart,deleteFromCart } = useContext(AppContext);
  const {  cart } = state;

  const handleAddToCart = (product) => () => {
    addToCart(product);
  };
  const handleRemoveFromCart = (product) => () => {
    removeFromCart(product);
  };

  const handleDeleteFromCart = (product) => () => {
    deleteFromCart(product);
  };

  const groupByNombre = (array) => {
    const result = array.reduce((acc, item) => {
      const { nombre, price, id } = item;
      if (!acc[nombre]) {
        acc[nombre] = { nombre, count: null, totalPrice: 0,cantidad: 0, id };
      }
      acc[nombre].cantidad += 1;
      acc[nombre].totalPrice += price;
      acc[nombre].price = price;
      acc[nombre].id = id;
      return acc;
    }, {});

    return Object.values(result);
  };
  const groupedCart = groupByNombre(cart);

  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  };

  return (
    <div className="Checkout">
      {groupedCart.length > 0 ?
        // <h3>Lista de pedidos:</h3>
        <div className="Checkout-content">

          <table className="Checkout-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio 1/u</th>
                <th>Cantidad</th>
                <th>Precio</th>                
                <td>&nbsp;</td>
              </tr>
            </thead>
            <tbody>
              {groupedCart.map(
                (product, key) => (
                  (
                    <tr key={key}>
                      <td>{product.nombre}</td>
                      <td>$ {product.price}</td>
                      <td> {product.cantidad}</td>
                      <td>$ {product.totalPrice}</td>
                      <td><div className="Checkout-buttons">
                        <div className="Checkout-button-addDelete">
                          <AddDelete product={product} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart} handleDeleteFromCart={handleDeleteFromCart} />
                        </div>
                          <button type="button" onClick={handleRemoveFromCart(product)}><i className="fas fa-trash-alt " /></button>
                      </div>
                      </td>
                    </tr>
                  )
                )
              )}
              <tr>
                <td><h4>Valor Total</h4></td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>{`$ ${handleSumTotal()}`}</td>
                <td>&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>
        : <h3>Sin pedidos...</h3>}
      {cart.length > 0 && (
        <div className="Checkout-sidebar">
          <h3>{`Precio Total: $ ${handleSumTotal()}`}</h3>
          <Link to="/checkout/payment">
            <button type="button">Continuar pedido</button>
          </Link>
        </div>
      )}
      {/* {JSON.stringify(cart)} */}
    </div>
  );
};

export default Checkout;
