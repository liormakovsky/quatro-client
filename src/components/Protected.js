import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const Protected = (props) => {
  const { user } = useSelector((state) => state.userReducer);

  if (!user) {
    console.log("lira");
    return <Navigate to="/login" />;
  }
  console.log("lira2");
  let Cmp = props.Cmp;
  return (
    <>
      <Cmp />
    </>
  );
};

export default Protected;
