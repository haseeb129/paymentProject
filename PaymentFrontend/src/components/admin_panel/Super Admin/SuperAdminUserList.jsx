import React, { Component } from "react";
import { Table, Row, Col } from "react-bootstrap";
import Sidebar from "./SuperAdminSidebar";
import DeleteIcon from "@material-ui/icons/Delete";
import AdminNavbar from "../AdminNavbar";
import IconButton from "@material-ui/core/IconButton";

import axios from "axios";
export default class SuperAdminUserList extends Component {
  state = {
    users: [],
  };

  fetchData = () => {
    axios
      .get("http://192.168.18.8:6001/myapp/api/auth/admins")
      .then((response) => {
        this.setState({ users: response.data.users }, () => {
          this.setState({ loading: false });
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  handleDelete = async (data) => {
    const r = window.confirm("Delete This Admin?");
    if (r === false) {
      return;
    }
    const originalState = this.state.users;
    const users = this.state.users.filter((c) => c._id !== data._id);
    this.setState({ users: users }); //remove from state

    await axios
      .delete(`http://192.168.18.8:6001/myapp/api/auth/delete/${data._id}`) //remove from Database
      .then((res) => {
        alert("Admin Is Deleted");
      })
      .catch((err) => {
        alert("ERROR : Admin Is Deleted");

        this.setState({ users: originalState });
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
              <AdminNavbar />
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
                    <th>Email</th>
                    <th>Route</th>
                  </tr>
                </thead>
                <tbody className="tabelBody">
                  {this.state.users.map((data) => {
                    return (
                      <tr>
                        <td>
                          <div className="mt-3">{data.email}</div>
                        </td>
                        <td>
                          <div className="mt-3">{data.route}</div>
                        </td>
                        <td>
                          <IconButton
                            onClick={() => this.handleDelete(data)}
                            color="secondary"
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </td>
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
