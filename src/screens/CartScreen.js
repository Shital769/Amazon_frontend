import React from "react";
import { useParams, useLocation } from "react-router-dom";

export default function CartScreen(props) {
  const { id } = useParams();
  const location = useLocation();
  const qty = new URLSearchParams(location.search).get("qty") || 1;

  //   const qty = props.location.search
  //     ? Number(props.location.search.split("=")[1])
  //     : 1;
  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        ADD TO CART : ProductID: {id} Qty: {qty}
      </p>
    </div>
  );
}
