import React from 'react';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import './ButtonGroup'; // Import file CSS

const ButtonGroup = () => (
  <div className="button-group">
    <Button type="primary">
      <NavLink to='/EditProfile'>Edit</NavLink>
    </Button>
    <Button type="default">
      <NavLink to='/Menu'>Exit</NavLink>
    </Button>
    <Button type="default">
      <NavLink to='/AddClass'>Add Classes</NavLink>
    </Button>
    <Button type="default">
      <NavLink to='/AddDepartments'>Add Classes2</NavLink>
    </Button>
  </div>
);

export default ButtonGroup;
