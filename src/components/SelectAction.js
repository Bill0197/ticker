import React, { useState } from 'react';
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  NavItem,
  NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

const SelectAction = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <Dropdown className='float-right my-2 mr-3' isOpen={open} toggle={toggle}>
      <DropdownToggle caret>Choose Your View</DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
          <NavItem>
            <NavLink tag={RRNavLink} to='/trade'>
              Trade
            </NavLink>
          </NavItem>
        </DropdownItem>
        <DropdownItem>
          <NavItem>
            <NavLink tag={RRNavLink} to='/transactions'>
              Transactions
            </NavLink>
          </NavItem>
        </DropdownItem>
        <DropdownItem>
          <NavItem>
            <NavLink tag={RRNavLink} to='/portfolio'>
              Portfolio
            </NavLink>
          </NavItem>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default SelectAction;
