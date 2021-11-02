import React, { Component } from "react";
import Sidebar from "./Sidebar";
import { Button, Form, Alert, Row, Col } from "react-bootstrap/";
import axios from "axios";
import AdminNavbar from "../admin_panel/AdminNavbar";
import auth from "../authService";
class EditProfile extends Component {
  state = {
    user: auth.getCurrentUser(),
    previousPassword: "",
    newPassword: "",
    newPassword1: "",
    missMatch: false,
    updated: false,
    error: false,
    waiting: false,
  };
  handleChange = async (e) => {
    await this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.newPassword === this.state.newPassword1) {
      this.setState({
        missMatch: false,
        updated: false,
        error: false,
        waiting: true,
      });
      console.log(this.state);

      axios
        .patch(
          `http://192.168.18.8:6001/myapp/api/auth/updatePassword/${this.state.user.id}`,
          {
            oldPassword: this.state.previousPassword,
            newPassword: this.state.newPassword,
          }
        )
        .then((response) => {
          this.setState({
            updated: true,
            error: false,
            waiting: false,
            missMatch: false,
          });
          console.log("response", response);
        })
        .catch((err) => {
          this.setState({
            updated: false,
            error: true,
            waiting: false,
            missMatch: false,
          });
          console.log("ERROR", err);
        });
    } else {
      this.setState({ missMatch: true });
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
              <h4>Edit Details</h4>
              <Form onSubmit={this.handleSubmit} className="mt-3">
                <Form.Group controlId="formBasicPassword">
                  <Row>
                    <Col md={4}>
                      <Form.Label>Enter Previous Password</Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="password"
                        placeholder="Type Here"
                        value={this.state.previousPassword}
                        name="previousPassword"
                        onChange={this.handleChange}
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group>
                  <Row>
                    <Col md={4}>
                      <Form.Label>Enter New Password</Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="password"
                        placeholder="Type Here"
                        value={this.state.newPassword}
                        name="newPassword"
                        onChange={this.handleChange}
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Row>
                    <Col md={4}>
                      <Form.Label>Re-Enter New Password</Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="password"
                        placeholder="Type Here"
                        value={this.state.newPassword1}
                        name="newPassword1"
                        onChange={this.handleChange}
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>

                <Row>
                  <Col md={12}>
                    <Button
                      className="mt-5"
                      variant="Default"
                      type="submit"
                      size="lg"
                      style={{
                        color: "white",
                        background:
                          "linear-gradient(to bottom,#004d40 0%, #009688 100%)",
                      }}
                      block
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
                {this.state.missMatch && (
                  <Alert className="mt-2" variant="danger">
                    Password Not Match
                  </Alert>
                )}
                {this.state.updated && (
                  <Alert className="mt-2" variant="success">
                    Updated Successfully
                  </Alert>
                )}
                {this.state.error && (
                  <Alert className="mt-2" variant="danger">
                    Error Occured
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
    );
  }
}

export default EditProfile;
