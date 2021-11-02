import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { Nav, Button } from "react-bootstrap/";
class SuperAdminSidebar extends Component {
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
            <NavLink to="/superAdmin">
              <Button variant="info" block>
                Dashboard
              </Button>
            </NavLink>
          </Nav.Item>
          <br />
          <Nav.Item className="mt-1">
            <NavLink to="/superAdminUserList">
              <Button block variant="info">
                Sub-Admin List
              </Button>
            </NavLink>
          </Nav.Item>
          <br />
          <Nav.Item className="mt-1">
            <NavLink to="/superAdminEditProfile">
              <Button variant="info" block>
                Edit Profile
              </Button>
            </NavLink>
          </Nav.Item>
          <br />
          <Nav.Item className="mt-1">
            <NavLink to="/superAdminPending">
              <Button variant="info" block>
                Pending
              </Button>
            </NavLink>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}

export default SuperAdminSidebar;
