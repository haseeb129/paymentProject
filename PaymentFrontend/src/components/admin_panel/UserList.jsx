import React, { Component } from "react";
import { Table } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { Row, Col } from "react-bootstrap/";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
class UserList extends Component {
  state = {
    users: [
      {
        id: 1,
        firstName: "demoUsers",
        lastName: "demoUsers",
        email: "demoUsers",
      },
      {
        id: 1,
        firstName: "demoUsers",
        lastName: "demoUsers",
        email: "demoUsers",
      },
      {
        id: 1,
        firstName: "demoUsers",
        lastName: "demoUsers",
        email: "demoUsers",
      },
      {
        id: 1,
        firstName: "demoUsers",
        lastName: "demoUsers",
        email: "demoUsers",
      },
    ],
  };

  fetchData = () => {
    console.log("this.state.users");
    axios
      .get("http://192.168.18.8:6001/myapp/api/auth/customers")
      .then((response) => {
        console.log("response", response);
        this.setState({ users: response.data.users }, () => {
          console.log(this.state.users);
          this.setState({ loading: false });
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  componentDidMount() {
    this.fetchData();
  }
  render() {
    return (
      <Row>
        <Col>
          <Row className="p-0">
            <Col md={12} lg={12} sm={12} className="p-0 ">
              <AdminNavbar
                user={this.state.user}
                adminSetting={this.state.adminSetting}
              />
            </Col>
          </Row>

          <Row className="p-0 sideBar2">
            <Col md={3} xs={12} sm={12} lg={2} className="p-0">
              <Sidebar />
            </Col>
            <Col md={9} xs={12} sm={12} lg={9} className=" mt-3 contentCenter ">
              <Table striped hover responsive variant="dark">
                <thead className="tabelHeader">
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody className="tabelBody">
                  {this.state.users.map((data) => {
                    return (
                      <tr>
                        <td>{data.firstName}</td>
                        <td>{data.lastName}</td>
                        <td>{data.email}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default UserList;
