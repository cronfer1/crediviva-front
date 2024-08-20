import React, { useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import "../styles/components/Payment.css";
import { postCart } from '../hooks/usePetitions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default () => {
  const { state, addToBuyer,removeCart } = useContext(AppContext);
  const form = useRef(null);
  const navigate = useNavigate();
  const { cart, buyer } = state;

  const handleSubmit = async () => {
    const formData = new FormData(form.current);
    const buyer = {
      nombre: formData.get("name"),
      email: formData.get("email"),
      address: formData.get("address"),
      datail: formData.get("datail"),
      city: formData.get("city"),
      country: formData.get("country"),
      state: formData.get("state"),
      cp: formData.get("cp"),
      phone: formData.get("phone"),
    };
    addToBuyer(buyer);
    if (buyer.email) {

      const body = {
        ...buyer, products: groupedCart
      }
      console.log(groupedCart)
      if (groupedCart.length > 0) {
        const response = await postCart(body)
      } else {
        toast.error("Por favor, selecione algun producto.")
      }
      removeCart()
      navigate("/checkout/success");
    } else {
      toast.error("El correo electronico es obligatorio.")
    }
  };
  const groupByNombre = (array) => {
    const result = array.reduce((acc, item) => {
      const { nombre, price, id } = item;
      if (!acc[nombre]) {
        acc[nombre] = { nombre, totalPrice: 0, count: 0, id };
      }
      acc[nombre].count += 1;
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
    <div className="Information">
      <div className="Information-content">
        <div className="Information-head">
          <h2>Informacion de contacto</h2>
          <span>los campos con (*) son obligatorios</span>
        </div>
        <div className="Informatio-form">
          <form ref={form}>
            <input type="text" placeholder="Nombre completo " name="name" defaultValue={buyer.nombre} />
            <input type="text" placeholder="Correo electoronico *" name="email" defaultValue={buyer.email} />
            <input type="text" placeholder="Direccion " name="address" defaultValue={buyer.address} />
            <input type="text" placeholder="Detalle " name="datail" defaultValue={buyer.datail} />
            <input type="text" placeholder="Ciudad " name="city" defaultValue={buyer.city} />
            <input type="text" placeholder="Pais " name="country" defaultValue={buyer.country} />
            <input type="text" placeholder="Estado " name="state" defaultValue={buyer.state} />
            <input type="text" placeholder="Codigo postal " name="cp" defaultValue={buyer.cp} />
            <input type="text" placeholder="Telefono " name="phone" defaultValue={buyer.phone} />
          </form>
        </div>
        <div className="Information-buttons">
          <Link to="/checkout">
            <div className="Information-back">Regresar</div>
          </Link>
          <div className="Information-next">
            <button type="button" onClick={handleSubmit}>
              Pagar
            </button>
          </div>
        </div>
      </div>
      <div className="Information-sidebar">
        <h3>Pedido: </h3>
        {groupedCart.map((product, key) => (
          <div className="Information-item" key={key}>
            <div className="Information-element">
              <div> <h4>{product.nombre}</h4>
                <span> {product.count} x ${product.price}</span></div>
              <span>${product.totalPrice}</span>
            </div>
          </div>
        ))}
        <div className="Information-item" key="total">
          <div className="Information-element">
            <h4>Total</h4>
            <span>${handleSumTotal()}</span>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={1200} closeOnClick />
    </div>
  );
};
