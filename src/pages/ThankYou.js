import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ThankYou = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.messagesReducer);

  return (
    <>
      <h1>this is thank you page</h1>
    </>
  );
};

export default ThankYou;
