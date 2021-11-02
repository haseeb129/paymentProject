import React, { Component } from "react";
import { Alert, Button, Form, Row, Col } from "react-bootstrap/";
import axios from "axios";
import auth from "./authService";
import Navbar from "./Navbar";
export default class SignIn extends Component {
  state = {
    email: "",
    password: "",
    result: null,

    organizationRoute: this.props.match.params.OrgID,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state);

    const userObject = {
      email: this.state.email,
      pass: this.state.password,
    };
    console.log("userObject", userObject);
    await axios
      .post("http://192.168.18.8:6001/myapp/api/auth/login", userObject)
      .then(async (response) => {
        const user = response.data.user;
        console.log("response", user);
        await auth.logout();
        await auth.loginWithJWT(response.data.token);
        if (user.isAdmin) window.location = "/admin/dashboard";
        else window.location = "/" + this.state.organizationRoute;
      })
      .catch((err) => {
        this.setState({ result: err.response.data.message });
      });
  };
  componentDidMount() {
    console.log("Sign In component", this.props);
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
  }
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
                  <h1>Sign in</h1>

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
                        Login
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
    else
      return (
        <Row>
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <h1>Sign in</h1>

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
                    Login
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
      );
  }
}
