import React, { Component } from "react";
import { Alert, Button, Form, Row, Col, InputGroup } from "react-bootstrap/";
import Sidebar from "./SuperAdminSidebar";
import axios from "axios";
import AdminNavbar from "../AdminNavbar";

class SuperAdminDashboard extends Component {
  state = {
    adminPassword: "",
    adminEmail: "",
    route: "",
    updated: false,
    error: false,
    waiting: false,
    responsemessage: null,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("State", this.state);
    this.setState({ updated: false, error: false, waiting: true });

    const userObject = {
      email: this.state.adminEmail,
      pass: this.state.adminPassword,
      route: "/" + this.state.route,
    };
    axios
      .post("http://192.168.18.8:6001/myapp/api/auth/addadmin", userObject)
      .then((response) => {
        this.setState({
          updated: true,
          error: false,
          waiting: false,
          responsemessage: response.data.message,
        });

        console.log("Response", response.data.message);
      })
      .catch((err) => {
        this.setState({
          updated: false,
          error: true,
          waiting: false,
          responsemessage: err.response.data.message,
        });
      });
  };

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
            <Col md={3} sm={12} lg={2} className="p-0 m-0">
              <Sidebar />
            </Col>

            <Col md={9} sm={12} lg={8} className="mt-2">
              <Row className="p-0 sideBar2 mt-3">
                <Col md={12} sm={12} lg={12} className="mb-2">
                  <Form onSubmit={this.handleSubmit}>
                    <div
                      className="p-2"
                      style={{ backgroundColor: " #9FA8A3" }}
                    >
                      <Row>
                        <Col md={12} className="mb-2  ">
                          <h5>Organization Admin Information:</h5>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={4} xs={12} lg={4}>
                          <Form.Group>
                            <Row>
                              <Col md={12}>
                                <p className="fontSize">Admin Email</p>
                              </Col>
                              <Col md={12}>
                                <Form.Control
                                  placeholder="Admin Email"
                                  type="email"
                                  required
                                  value={this.state.adminEmail}
                                  name="adminEmail"
                                  onChange={this.handleChange}
                                />
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>

                        <Col md={4} xs={12} lg={4}>
                          <Form.Group controlId="">
                            <Row>
                              <Col md={12}>
                                <p className="fontSize">Admin Password</p>
                              </Col>
                              <Col md={12}>
                                <Form.Control
                                  type="text"
                                  placeholder="Admin Password"
                                  value={this.state.adminPassword}
                                  name="adminPassword"
                                  onChange={this.handleChange}
                                  required
                                />
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>
                        <Col md={4} xs={12} lg={4}>
                          <Form.Group controlId="">
                            <Row>
                              <Col md={12}>
                                <p className="fontSize">
                                  Route For Organization
                                </p>
                              </Col>
                              <Col md={12}>
                                <InputGroup>
                                  <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">
                                      /
                                    </InputGroup.Text>
                                  </InputGroup.Prepend>
                                  <Form.Control
                                    type="text"
                                    placeholder="Route"
                                    value={this.state.route}
                                    name="route"
                                    onChange={this.handleChange}
                                    required
                                  />
                                </InputGroup>
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>
                      </Row>
                    </div>

                    <Button
                      variant="default"
                      className="mt-3"
                      type="submit"
                      size="lg"
                      block
                      style={{
                        color: "white",
                        background:
                          "linear-gradient(to bottom,#004d40 0%, #009688 100%)",
                      }}
                    >
                      {this.props.details ? "Update" : "Save"}
                    </Button>

                    {this.props.details && (
                      <Button
                        variant="danger"
                        onClick={this.handleDelete}
                        size="lg"
                        block
                      >
                        Delete
                      </Button>
                    )}
                    {this.state.updated && (
                      <Alert className="mt-2" variant="success">
                        {this.state.responsemessage}
                      </Alert>
                    )}
                    {this.state.error && (
                      <Alert className="mt-2" variant="danger">
                        {this.state.responsemessage}
                      </Alert>
                    )}
                    {this.state.waiting && (
                      <Alert className="mt-2" variant="info">
                        Waiting For Response
                      </Alert>
                    )}
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default SuperAdminDashboard;
