import React, { useContext } from "react";
import { Link,useNavigate  } from "react-router-dom";
import AppContext from "../context/AppContext";
import "../styles/components/Header.css";
import { getCart } from '../hooks/usePetitions';

const Header = () => {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  const { cart } = state;
  

  const handleClick = async () => {
    
    const response = await getCart()
    navigate('/Deliveries', { state: response });
  };

  return (
    <div className="Header">
      <Link to="/">
        <h1 className="Header-tittle">Crediviva Store</h1>
      </Link>

      <h4 className="Header-deliver" onClick={handleClick}>Pedidos realizados</h4>

      <div className="Header-checkout">
        <Link to="/checkout">
          <i className="fas fa-shopping-basket" />
        </Link>
        {cart.length > 0 && <div className="Header-alert">{cart.length}</div>}
      </div>
    </div>
  );
};
export default Header;
