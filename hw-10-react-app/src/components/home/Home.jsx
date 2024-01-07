import React from 'react';
import { useAuth } from '../../share/AuthContext';
import { FaRegSmile } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className='container '>
      {isAuthenticated ? <p>Hello, user! <FaRegSmile /></p> : <p>Please, login! <IoIosLogIn /></p>}
    </div>
  );
};

export default Home;