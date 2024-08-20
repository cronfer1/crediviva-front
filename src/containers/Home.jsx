import React from "react";
import Products from "../components/Products";
import initialState from "../initialState";

export default () => {
  return (
    <Products products={initialState.products} />
  );
};
