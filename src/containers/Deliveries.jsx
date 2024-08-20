import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import "../styles/components/Deliver.css";
import { putCart } from "../hooks/usePetitions";

export default () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState(location.state?.body||[]);
  
  useEffect(() => {
    if (data.length === 0) {
      navigate("/");
    }
  }, [data, navigate]);


  const handleChangeData = async (product) => {
    const body={id:product.id}
    await putCart(body)
    const newData = data.map((order) => {
      if (order.id === product.id) {
        return {
          ...order, 
          status: "completado", 
        };
      }
      return order;
    });
    setData(newData);
  };

  return (
    <table className="Deliver-table">
      <thead>
        <tr>
          <th>Id {" "}</th>
          <th>Correo</th>
          <th>Productos</th>
          <th>Total Price</th>
          <th>Estado</th>
          <th>Created</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {data.map((order, key) => (
          <tr key={key} >
            <td><h4 className="h4">{order.id}</h4></td>
            <td>{order.email}</td>
            <td>
              <ul className="Deliver-list">
                {order.product_details.map((product, key2) => (
                  <li key={key2}>
                    {product.nombre} (x{product.quantity}) - ${product.price * product.quantity}
                  </li>
                ))}
              </ul>
            </td>
            <td>${order.total_price}</td>
            <td>{order.status}</td>
            <td>{order.created}</td>
            <td > <div  className="button"> {order.status === "pendiente" ?
              <button type="button" onClick={() => handleChangeData(order)} >Entregar</button>
              : <h4>Finalizado</h4>}
               </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
