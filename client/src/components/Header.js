// src/components/Header.js

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Header = () => {
  const { userRole } = useContext(AuthContext);

  console.log(userRole);

  return (
    <header>
      <nav>
        <ul className='flex justify-between mx-16'>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          {userRole && (userRole === 'admin' || userRole === 'editor') && (
            <li>
              <Link to="/create-post">Create Post</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
