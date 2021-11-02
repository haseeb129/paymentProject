import React, { Component } from "react";
import Sidebar from "./SuperAdminSidebar";
import {
  Button,
  Form,
  Alert,
  Row,
  Col,
  InputGroup,
  Table,
} from "react-bootstrap/";
import axios from "axios";
import auth from "../../authService";
import AdminNavbar from "../AdminNavbar";
export default class SuperAdminPending extends Component {
  state = {
    organizations: [],
  };
  componentDidMount() {
    axios
      .get("http://192.168.18.8:6001/myapp/api/admin/getPendingRequests")
      .then((res) => {
        console.log(" pending response", res.data.organizations);
        this.setState({ organizations: res.data.organizations });
      })
      .catch((err) => {
        console.log("Error pending", err.response);
      });
  }
  handleChange = async (e, index) => {
    const { organizations } = this.state;
    const name = e.target.name;

    if (name == "adminEmail") {
      organizations[index].adminEmail = e.target.value;
    } else if (name == "adminPassword") {
      organizations[index].adminPassword = e.target.value;
    } else if (name == "route") {
      organizations[index].route = "/" + e.target.value;
    }

    console.log("Orgnizatiojnssssssss", organizations);
    this.setState({ organizations });
  };
  handleSubmit = (e, data, index) => {
    const originalState = this.state.organizations;
    const organizations = this.state.organizations.filter(
      (c) => c._id !== data._id
    );

    let adminObject = {
      email: data.adminEmail,
      password: data.adminPassword,
      route: data.route,
    };
    console.log("adminObject", adminObject);
    if (true) {
      axios
        .post(
          `http://192.168.18.8:6001/myapp/api/admin/approve/${data._id}`,
          adminObject
        )
        .then((res) => {
          console.log("adminObject", res.data);
          this.setState({ organizations: organizations });
        })
        .catch((err) => {
          console.log("Error adminObject", err.response);
        });
    }
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
            <Col md={3} sm={12} lg={2} className="p-0">
              <Sidebar />
            </Col>
            <Col md={9} sm={12} lg={8} className="pt-3  mb-2 ">
              <h4>
                Pending Organizations:
                <span className="bold ">
                  {" "}
                  {this.state.organizations.length}
                </span>{" "}
              </h4>

              {this.state.organizations.map((element, index) => {
                return (
                  <div>
                    <div
                      className="p-2"
                      style={{ backgroundColor: " #9FA8A3" }}
                    >
                      <Row>
                        <Col md={12} className="mb-2  ">
                          <h5>Business Name:{element.businessName}</h5>
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
                                  onChange={(e) => {
                                    this.handleChange(e, index);
                                  }}
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
                                  onChange={(e) => {
                                    this.handleChange(e, index);
                                  }}
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
                                    onChange={(e) => {
                                      this.handleChange(e, index);
                                    }}
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
                      className="mt-2 mb-4"
                      value={element}
                      onClick={(e) => this.handleSubmit(e, element, index)}
                      size="lg"
                      block
                      style={{
                        color: "white",
                        background:
                          "linear-gradient(to bottom,#004d40 0%, #009688 100%)",
                      }}
                    >
                      Save
                    </Button>
                  </div>
                );
              })}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
