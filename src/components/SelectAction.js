import React, {Component} from 'react'
import {Dropdown, DropdownMenu, DropdownItem, DropdownToggle, NavItem, NavLink} from 'reactstrap';
import {NavLink as RRNavLink} from 'react-router-dom';

class SelectAction extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      dropdownOpen: false,
      
    };
    this.toggle = this.toggle.bind(this);
  }
  
  toggle() {
    this.setState({dropdownOpen: !this.state.dropdownOpen});
  }
  
  render(){
    return (
      <Dropdown className="float-right my-2 mr-3" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Choose Your View
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/trade'>Trade</NavLink>
            </NavItem>
          </DropdownItem>
          <DropdownItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/transactions'>Transactions</NavLink>
            </NavItem>
          </DropdownItem>
          <DropdownItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/portfolio'>Portfolio</NavLink>
            </NavItem>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
  
}

export default SelectAction;