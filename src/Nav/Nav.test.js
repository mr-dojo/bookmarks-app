import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import { BrowserRouter } from 'react-router-dom'
=======
import { BrowserRouter } from 'react-router-dom';
>>>>>>> fa8da82
import Nav from './Nav';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Nav />
<<<<<<< HEAD
    </BrowserRouter>, 
    div);
=======
    </BrowserRouter>,
    div
  );
>>>>>>> fa8da82
  ReactDOM.unmountComponentAtNode(div);
});
