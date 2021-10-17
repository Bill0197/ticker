import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

export default class Example extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <div>
        <Navbar className='mt-3' color={this.props.color} light>
          <NavbarBrand href='/' className='mr-auto'>
            <h2>Ticker</h2>
          </NavbarBrand>
        </Navbar>
      </div>
    );
  }
}
