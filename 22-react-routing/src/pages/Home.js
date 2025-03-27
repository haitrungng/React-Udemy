import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  function navigateHandler() {
    navigate("/products");
  }

  return (
    <>
      <h1>My Home page</h1>
      <div>
        Go to <Link to="/products">Products</Link>
      </div>
      <div>
        <button onClick={navigateHandler}>Go to Products</button>
      </div>
    </>
  );
};

export default Home;
