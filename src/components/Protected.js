import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Protected = (props) => {
  const { user } = useSelector((state) => state.userReducer);

  if (!user) {
    return <Navigate to="/login" />;
  }

  let Cmp = props.Cmp;
  return (
    <>
      <Cmp />
    </>
  );
};

export default Protected;
