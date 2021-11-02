import React, { Component } from "react";
import { Alert, Button, Form, Row, Col } from "react-bootstrap/";
import auth from "./authService";
import axios from "axios";
import Navbar from "./Navbar";

export default class SignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    result: null,
    roles: null,
    organizationRoute: this.props.match.params.OrgID,
  };

  componentDidMount() {
    console.log("Sign In component", this.state.organizationRoute);
    axios
      .get("http://192.168.18.8:6001/myapp/api/admin/getAll")
      .then((response) => {
        console.log("organization details ", response.data.organizations);

        response.data.organizations.filter((element) => {
          if (element.auth.route === this.state.organizationRoute) {
            this.setState({ adminSetting: element }, () => {
              console.log("Admin Setting ", this.state);
            });
          }
          return 0;
        });
      })
      .catch((err) => {
        console.log("Sign Up organization details Error", err.response);
      });

    axios
      .get("http://192.168.18.8:6001/myapp/api/roles")
      .then((response) => {
        this.setState({ roles: response.data }, () => {
          console.log("ROLES", this.state.roles.roles[1]._id);
        });
      })
      .catch((err) => console.log("Error", err));
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ result: null });
    console.log(this.state);

    const userObject = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      pass: this.state.password,
      roleId: this.state.roles.roles[1]._id,
      adminId: this.state.adminSetting._id,
      adminAuth: this.state.adminSetting.auth._id,
    };
    axios
      .post("http://192.168.18.8:6001/myapp/api/auth/signup", userObject)
      .then((response) => {
        console.log("response", response);

        auth.loginWithJWT(response.data.token);
        console.log("User", auth.getCurrentUser());
        let route = "/" + this.state.organizationRoute;
        window.location = route;
      })
      .catch((err) => {
        this.setState({ result: err.response.data.message });
      });
  };
  render() {
    if (this.state.adminSetting)
      return (
        <Row>
          <Col>
            <Row className="p-0">
              <Col md={12} lg={12} sm={12} className="p-0 ">
                <Navbar
                  user={this.state.user}
                  adminSetting={this.state.adminSetting}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form onSubmit={this.handleSubmit}>
                  <h1>Sign Up</h1>

                  <Row>
                    <Col lg={7} md={5}>
                      <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="firstName"
                          onChange={this.handleChange}
                          required
                          name="firstName"
                          value={this.state.firstName}
                          placeholder="Enter First Name"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={7} md={5}>
                      <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="lastName"
                          onChange={this.handleChange}
                          required
                          name="lastName"
                          value={this.state.lastName}
                          placeholder="Enter Last Name"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={7} md={5}>
                      <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          onChange={this.handleChange}
                          required
                          name="email"
                          value={this.state.email}
                          placeholder="Enter Email"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={7} md={5}>
                      <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          onChange={this.handleChange}
                          required
                          name="password"
                          value={this.state.password}
                          placeholder="Enter Password"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col lg={7} md={5}>
                      <Button variant="primary" size="lg" block type="submit">
                        Sign Up
                      </Button>
                      <br />
                      {this.state.result && (
                        <h5>
                          <Alert variant="danger">{this.state.result}</Alert>
                        </h5>
                      )}
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      );
    else return <h2>No organization found</h2>;
  }
}
