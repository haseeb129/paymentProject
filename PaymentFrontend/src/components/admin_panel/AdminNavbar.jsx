import React, { Component } from "react";
import { Navbar, Nav, NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "react-bootstrap/";
import auth from "../authService";
import axios from "axios";

export default class AdminNavbar extends Component {
  state = {};
  handleLogout = () => {
    auth.logout();
    window.location = "/";
  };
  componentDidMount() {
    console.log("Navbar adminSetting", this.props.adminSetting);
    console.log("Navbar Props", this.props);
  }

  render() {
    return (
      <Navbar
        style={{ color: "#9FA8A3" }}
        className=" color-nav"
        collapseOnSelect
        expand="lg"
      >
        <Navbar.Brand className="navbar-brand-center">
          {/* {this.props.adminSetting && this.props.adminSetting.image && (
            <img
              src={this.props.adminSetting.image}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
          )} */}
          Payment App (Admin)
        </Navbar.Brand>
        {this.props.adminSetting && (
          <div className="navbar-header">
            <a className="navbar-brand" style={{ color: "black" }}>
              {this.props.adminSetting
                ? this.props.adminSetting.displayName
                : null}
            </a>
          </div>
        )}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
            className="ml-auto"
            style={{
              marginLeft: "15%",
            }}
          >
            {/* {this.state.user && this.state.user.isAdmin && (
              <Button
                variant="light"
                onClick={(event) => (window.location.href = "/admin")}
                style={{
                  marginRight: "1rem",
                }}
              >
                Admin Panel
              </Button>
            )} */}

            <Button
              variant="outline-dark"
              onClick={this.handleLogout}
              style={{
                marginRight: "1rem",
              }}
            >
              SignOut
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
