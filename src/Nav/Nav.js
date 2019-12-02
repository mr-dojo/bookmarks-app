import React from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom'
=======
import { Link } from 'react-router-dom';
>>>>>>> fa8da82

export default function Nav(props) {
  return (
    <nav className='Nav'>
      <Link to={'/'}>
        Bookmark List
      </Link>
      {' '}
      <Link to={'/add-bookmark'}>
        Add Bookmark
      </Link>
    </nav>
  );
}
