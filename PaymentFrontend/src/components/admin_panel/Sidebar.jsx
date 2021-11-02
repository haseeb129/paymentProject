import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { Nav, Button } from "react-bootstrap/";
class Slidebar extends Component {
  state = {};
  render() {
    return (
      <div style={{ backgroundColor: "" }} className="container sideBar1 ">
        <Nav
          bg="dark"
          fill
          variant="pills"
          defaultActiveKey="/admin"
          className="flex-column "
        >
          <Nav.Item className="mt-1">
            <NavLink to="/admin/dashboard">
              <Button variant="info" block>
                Dashboard
              </Button>
            </NavLink>
          </Nav.Item>
          <br />
          <Nav.Item className="mt-1">
            <NavLink to="/admin/userList">
              <Button block variant="info">
                User List
              </Button>
            </NavLink>
          </Nav.Item>
          <br />
          <Nav.Item className="mt-1">
            <NavLink to="/admin/editProfile">
              <Button variant="info" block>
                Edit Profile
              </Button>
            </NavLink>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}

export default Slidebar;
