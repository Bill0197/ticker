import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

export default (props) => {
  return (
    <div>
      <Navbar className='mt-3' color={props.color} light>
        <NavbarBrand href='/' className='mr-auto'>
          <h2>Ticker</h2>
        </NavbarBrand>
      </Navbar>
    </div>
  );
};
