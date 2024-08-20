import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../containers/Home";
import Checkout from "../containers/Checkout";
import NotFound from "../containers/NotFound";
import Payment from "../containers/Payment";
import Sucess from "../containers/Sucess";
import Deliveries from "../containers/Deliveries";
import Layout from "../components/Layout";
import AppContext from "../context/AppContext";
import useInitialState from "../hooks/useInitialState";

export default () => {
  const initialState = useInitialState();
  const isEmpty = Object.keys(initialState.state.products).length;
  return (
    <>
      {isEmpty > 0 ? (
        <AppContext.Provider value={initialState}>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/payment" element={<Payment />} />
                <Route path="/checkout/success" element={<Sucess />} />
                <Route path="/deliveries" element={<Deliveries />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </AppContext.Provider>)
        : <h1>Cargando...</h1>}
    </>
  );
};
