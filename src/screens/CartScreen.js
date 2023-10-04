import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import { useDispatch } from "react-redux";

export default function CartScreen() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const qty = new URLSearchParams(location.search).get("qty") || 1;

  //   const qty = props.location.search
  //     ? Number(props.location.search.split("=")[1])
  //     : 1;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);
  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        ADD TO CART : ProductID: {id} Qty: {qty}
      </p>
    </div>
  );
}
