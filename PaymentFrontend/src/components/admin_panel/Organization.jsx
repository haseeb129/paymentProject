import React, { Component } from "react";
import Switch from "react-switch";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Alert, Button, Form, Row, Col } from "react-bootstrap/";

import axios from "axios";
import auth from "../authService";
class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = { user: auth.getCurrentUser() };
  }

  componentDidMount() {
    console.log("Org", this.state.user);
    if (this.state.user) {
      axios
        .get(
          `http://192.168.18.8:6001/myapp/api/admin/get/${this.state.user.id}`
        )
        .then((res) => {
          const { details } = res.data;
          console.log("res", res.data.details);
          if (details.image) this.setState({ imageFile: "image Exists" });
          this.setState({ primaryName: details.primaryName });
          this.setState({ primaryAddress: details.primaryAddress });
          this.setState({ primaryEmail: details.primaryEmail });
          this.setState({ primaryPhoneNumber: details.primaryPhoneNumber });
          this.setState({ secondaryName: details.secondaryName });
          this.setState({ secondaryAddress: details.secondaryAddress });
          this.setState({ secondaryEmail: details.secondaryEmail });
          this.setState({ secondaryPhoneNumber: details.secondaryPhoneNumber });
          this.setState({ displayName: details.displayName });
          this.setState({ businessName: details.businessName });
          this.setState({ businessNumber: details.businessNumber });
          this.setState({ email: details.email });
          this.setState({ addressVerification: details.addressVerification });
          this.setState({ stripePublishableKey: details.stripePublishableKey });
          this.setState({ stripePrivateKey: details.stripePrivateKey });
          this.setState({ squareSandBoxKey: details.squareSandBoxKey });
          this.setState({ squareProductionKey: details.squareProductionKey });
          this.setState({ notificationEmail: details.notificationEmail });
          this.setState({ notificationEmail: details.notificationEmail });
          this.setState({ stripeEnabled: details.stripeEnabled });
          this.setState({
            activeOrganizationType: details.activeOrganizationType,
          });
          this.setState({ NewOrganization: false });
        })
        .catch((e) => {
          console.log("eerr", e.response);
          this.setState({ NewOrganization: true });
        });
    }
  }

  state = {
    file: "",
    primaryName: "",
    primaryAddress: "",
    primaryEmail: "",
    primaryPhoneNumber: "",
    secondaryName: "",
    secondaryAddress: "",
    secondaryEmail: "",
    secondaryPhoneNumber: "",
    displayName: "",
    businessName: "",
    businessNumber: "",
    email: "",
    activeOrganizationType: "",
    addressVerification: true,
    paymentMethod: "",
    updated: false,
    stripePublishableKey: "",
    stripePrivateKey: "",
    squareSandBoxKey: "",
    squareProductionKey: "",
    notificationEmail: "demo",
    SMTPIncomingServerName: "demo",
    SMTPOutgoingServerName: "demo",
    SMTPPortNumber: "demo",
    SMTPLogin: "demo",
    SMTPPassword: "demo",
    error: false,
    waiting: false,
    buttonText: this.props.details ? true : false,
    stripeEnabled: false,
  };

  handleDelete = (e) => {
    // const r = window.confirm("Do you really want to Delete ?");
    // console.log("Delete", e);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleRadio = (event) => {
    const target = event.target;
    if (target.value === "squareMethod")
      this.setState({ stripeEnabled: false });
    else this.setState({ stripeEnabled: true });
    this.setState({
      [target.name]: target.value,
    });
  };
  handleSwitch = (checked) => {
    this.setState({ addressVerification: checked });
  };
  onFileChange = (event) => {
    console.log("File Input ", event.target.files);
    this.setState({ file: event.target.files[0] });
  };

  handleSubmit = async (event) => {
    await event.preventDefault();
    this.setState({
      updated: false,
      error: false,
      waiting: true,
    });

    const data = new FormData();

    await data.append("image", this.state.file);
    await data.append("primaryName", this.state.primaryName);
    await data.append("primaryAddress", this.state.primaryAddress);
    await data.append("primaryEmail", this.state.primaryEmail);
    await data.append("primaryPhoneNumber", this.state.primaryPhoneNumber);
    await data.append("secondaryName", this.state.secondaryName);
    await data.append("secondaryAddress", this.state.secondaryAddress);
    await data.append("secondaryEmail", this.state.secondaryEmail);
    await data.append("secondaryPhoneNumber", this.state.secondaryPhoneNumber);
    await data.append("displayName", this.state.displayName);
    await data.append("businessName", this.state.businessName);
    await data.append("businessNumber", this.state.businessNumber);
    await data.append("email", this.state.email);
    await data.append("businessEmail", this.state.email);
    await data.append("addressVerification", this.state.addressVerification);
    await data.append("stripePublishableKey", this.state.stripePublishableKey);
    await data.append("stripePrivateKey", this.state.stripePrivateKey);
    await data.append("squareSandBoxKey", this.state.squareSandBoxKey);
    await data.append("squareProductionKey", this.state.squareProductionKey);
    await data.append("notificationEmail", this.state.notificationEmail);
    await data.append("stripeEnabled", this.state.stripeEnabled);

    await data.append(
      "activeOrganizationType",
      this.state.activeOrganizationType
    );
    // await data.append("paymentMethod", this.state.paymentMethod);
    // await data.append(
    //   "SMTPIncomingServerName",
    //   this.state.SMTPIncomingServerName
    // );
    // await data.append(
    //   "SMTPOutgoingServerName",
    //   this.state.SMTPOutgoingServerName
    // );
    // await data.append("SMTPPortNumber", this.state.SMTPPortNumber);
    // await data.append("SMTPLogin", this.state.SMTPLogin);
    // await data.append("SMTPPassword", this.state.SMTPPassword);
    await data.append("authId", this.state.user.id);
    await axios
      .post("http://192.168.18.8:6001/myapp/api/admin/add", data)
      .then((res) => {
        console.log("Responce foram data", res);
        this.setState({
          updated: true,
          error: false,
          waiting: false,
        });
      })
      .catch((err) => {
        console.log("Error Responce foram data", err.response.data);
        this.setState({
          updated: false,
          error: true,
          waiting: false,
        });
      });
  };

  handleType = (e) => {
    this.setState({ activeOrganizationType: e });
  };

  render() {
    if (this.state.user)
      return (
        <Row className="p-0 sideBar2 mt-3 ">
          <Col md={12} sm={12} lg={12} className="mb-2">
            <Form onSubmit={this.handleSubmit}>
              <div className="p-2 mb-1" style={{ backgroundColor: " #9FA8A3" }}>
                <Row>
                  <Col md={12}>
                    <h5>Primary Contact Information:</h5>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} xs={12} lg={6}>
                    <Form.Group controlId="">
                      <Row>
                        <Col md={12}>
                          <p className="fontSize">Name </p>
                        </Col>
                        <Col md={12}>
                          <Form.Control
                            type="text"
                            placeholder="Name"
                            value={this.state.primaryName}
                            name="primaryName"
                            onChange={this.handleChange}
                            required
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                  <Col md={6} xs={12} lg={6}>
                    <Form.Group controlId="">
                      <Row>
                        <Col md={12}>
                          <p className="fontSize">Address</p>
                        </Col>
                        <Col md={12}>
                          <Form.Control
                            type="text"
                            placeholder="Address"
                            value={this.state.primaryAddress}
                            name="primaryAddress"
                            onChange={this.handleChange}
                            required
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} xs={12} lg={6}>
                    <Form.Group controlId="">
                      <Row>
                        <Col md={12}>
                          <p className="fontSize">Email</p>
                        </Col>
                        <Col md={12}>
                          <Form.Control
                            type="email"
                            placeholder="Email"
                            value={this.state.primaryEmail}
                            name="primaryEmail"
                            onChange={this.handleChange}
                            required
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                  <Col md={6} xs={12} lg={6}>
                    <Form.Group controlId="">
                      <Row>
                        <Col md={12}>
                          <p className="fontSize">Phone Number</p>
                        </Col>
                        <Col md={12}>
                          <Form.Control
                            type="text"
                            placeholder="Phone Number"
                            value={this.state.primaryPhoneNumber}
                            name="primaryPhoneNumber"
                            onChange={this.handleChange}
                            required
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <h5 className="mt-1">Secondary Contact Information:</h5>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} xs={12} lg={6}>
                    <Form.Group controlId="">
                      <Row>
                        <Col md={12}>
                          <p className="fontSize">Name</p>
                        </Col>
                        <Col md={12}>
                          <Form.Control
                            type="text"
                            placeholder="Name"
                            value={this.state.secondaryName}
                            name="secondaryName"
                            onChange={this.handleChange}
                            required
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                  <Col md={6} xs={12} lg={6}>
                    <Form.Group controlId="">
                      <Row>
                        <Col md={12}>
                          <p className="fontSize">Address</p>
                        </Col>
                        <Col md={12}>
                          <Form.Control
                            type="text"
                            placeholder="Address"
                            value={this.state.secondaryAddress}
                            name="secondaryAddress"
                            onChange={this.handleChange}
                            required
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} xs={12} lg={6}>
                    <Form.Group controlId="">
                      <Row>
                        <Col md={12}>
                          <p className="fontSize">Email</p>
                        </Col>
                        <Col md={12}>
                          <Form.Control
                            type="email"
                            placeholder="Email"
                            value={this.state.secondaryEmail}
                            name="secondaryEmail"
                            onChange={this.handleChange}
                            required
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                  <Col md={6} xs={12} lg={6}>
                    <Form.Group controlId="">
                      <Row>
                        <Col md={12}>
                          <p className="fontSize">Phone Number</p>
                        </Col>
                        <Col md={12}>
                          <Form.Control
                            type="text"
                            placeholder="Phone Number"
                            value={this.state.secondaryPhoneNumber}
                            name="secondaryPhoneNumber"
                            onChange={this.handleChange}
                            required
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              <div className="p-2" style={{ backgroundColor: " #9FA8A3" }}>
                <Row>
                  <Col md={12} className="mb-2  ">
                    <h5>Business Information:</h5>
                  </Col>
                </Row>

                <Row>
                  <Col md={4} xs={12} lg={4}>
                    <Form.Group>
                      <Row>
                        <Col md={12}>
                          <p className="fontSize">Business Name</p>
                        </Col>
                        <Col md={12}>
                          <Form.Control
                            type="text"
                            placeholder="Type Here"
                            value={this.state.businessName}
                            name="businessName"
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
                          <p className="fontSize">Business Number</p>
                        </Col>
                        <Col md={12}>
                          <Form.Control
                            type="text"
                            placeholder="Type Here"
                            value={this.state.businessNumber}
                            name="businessNumber"
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
                          <p className="fontSize">Business Email</p>
                        </Col>
                        <Col md={12}>
                          <Form.Control
                            type="email"
                            placeholder="Type Here"
                            value={this.state.email}
                            name="email"
                            onChange={this.handleChange}
                            required
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} xs={12} lg={6}>
                    <Form.Group>
                      <Row>
                        <Col md={12}>
                          <p className="fontSize">Display Name</p>
                        </Col>
                        <Col md={12}>
                          <Form.Control
                            type="text"
                            placeholder="Display Name"
                            value={this.state.displayName}
                            name="displayName"
                            onChange={this.handleChange}
                            required
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                  <Col md={6} xs={12} lg={6}>
                    <Form.Group>
                      <Row>
                        <Col md={12}>
                          <p className="fontSize">Notification Email</p>
                        </Col>
                        <Col md={12}>
                          <Form.Control
                            type="text"
                            placeholder="notificationEmail"
                            value={this.state.notificationEmail}
                            name="notificationEmail"
                            onChange={this.handleChange}
                            required
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              <div
                className="p-2 mt-1 mb-1 "
                style={{ backgroundColor: " #9FA8A3" }}
              >
                <Row>
                  <Col md={12} className="mb-2  ">
                    <h5>Gateway Information:</h5>
                  </Col>
                </Row>

                <Row>
                  <Col md={2} xs={12} lg={2}>
                    <br />
                    <Form.Check
                      type="radio"
                      checked={this.state.stripeEnabled}
                      label="Stripe"
                      name="paymentMethod"
                      value="stripeMethod"
                      className="mt-1"
                      onChange={this.handleRadio}
                    />
                  </Col>
                  <Col md={5} xs={12} lg={5}>
                    <Form.Group>
                      <Row>
                        <Col md={12}>
                          <p className="fontSize">Stripe Publishable Key</p>
                        </Col>
                        <Col md={12}>
                          <Form.Control
                            disabled={
                              this.state.paymentMethod === "stripeMethod"
                                ? false
                                : true
                            }
                            type="text"
                            placeholder="Stripe Publishable Key"
                            value={this.state.stripePublishableKey}
                            name="stripePublishableKey"
                            onChange={this.handleChange}
                            required
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                  <Col md={5} xs={12} lg={5}>
                    <Form.Group>
                      <Row>
                        <Col md={12}>
                          <p className="fontSize">Stripe Private Key</p>
                        </Col>
                        <Col md={12}>
                          <Form.Control
                            disabled={
                              this.state.paymentMethod === "stripeMethod"
                                ? false
                                : true
                            }
                            type="text"
                            placeholder="Stripe Private Key"
                            value={this.state.stripePrivateKey}
                            name="stripePrivateKey"
                            onChange={this.handleChange}
                            required
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mt-1">
                  <Col md={2} xs={12} lg={2}>
                    <br />
                    <Form.Check
                      type="radio"
                      checked={!this.state.stripeEnabled}
                      label="Square"
                      name="paymentMethod"
                      value="squareMethod"
                      onChange={this.handleRadio}
                    />
                  </Col>
                  <Col md={5} xs={12} lg={5}>
                    <Form.Group controlId="">
                      <Row>
                        <Col md={12}>
                          <p className="fontSize">Square Sandbox Key</p>
                        </Col>
                        <Col md={12}>
                          <Form.Control
                            disabled={
                              this.state.paymentMethod === "squareMethod"
                                ? false
                                : true
                            }
                            type="text"
                            placeholder="Square Sandbox Key"
                            value={this.state.squareSandBoxKey}
                            name="squareSandBoxKey"
                            onChange={this.handleChange}
                            required
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                  <Col md={5} xs={12} lg={5}>
                    <Form.Group controlId="">
                      <Row>
                        <Col md={12}>
                          <p className="fontSize">Square Production Key</p>
                        </Col>
                        <Col md={12}>
                          <Form.Control
                            disabled={
                              this.state.paymentMethod === "squareMethod"
                                ? false
                                : true
                            }
                            type="text"
                            placeholder="Square Production Key"
                            value={this.state.squareProductionKey}
                            name="squareProductionKey"
                            onChange={this.handleChange}
                            required
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              <div className="p-2 mt-1" style={{ backgroundColor: " #9FA8A3" }}>
                <Row>
                  <Col md={12} className="mb-2  ">
                    <h5>SMTP server information:</h5>
                  </Col>
                </Row>
                <Row className="mt-1">
                  <Col md={6} xs={12} lg={6}>
                    <Form.Group>
                      <Row>
                        <Col md={12}>
                          <p className="fontSize">SMTP Incoming Server Name</p>
                        </Col>
                        <Col md={12}>
                          <Form.Control
                            type="text"
                            placeholder="SMTP Incoming Server Name"
                            name="SMTPIncomingServerName"
                            value={this.state.SMTPIncomingServerName}
                            onChange={this.handleChange}
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>

                  <Col md={6} xs={12} lg={6}>
                    <Form.Group>
                      <Row>
                        <Col md={12}>
                          <p className="fontSize">SMTP Outgoing Server Name</p>
                        </Col>
                        <Col md={12}>
                          <Form.Control
                            type="text"
                            placeholder="SMTP Outgoing Server Name"
                            value={this.state.SMTPOutgoingServerName}
                            name="SMTPOutgoingServerName"
                            onChange={this.handleChange}
                            required
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={4} xs={12} lg={4}>
                    <Form.Group>
                      <Row>
                        <Col md={12}>
                          <p className="fontSize">SMTP Port Number</p>
                        </Col>
                        <Col md={12}>
                          <Form.Control
                            type="text"
                            placeholder="SMTP Port Number"
                            name="SMTPPortNumber"
                            value={this.state.SMTPPortNumber}
                            onChange={this.handleChange}
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                  <Col md={4} xs={12} lg={4}>
                    <Form.Group>
                      <Row>
                        <Col md={12}>
                          <p className="fontSize">SMTP Login</p>
                        </Col>
                        <Col md={12}>
                          <Form.Control
                            type="text"
                            placeholder="SMTP Login"
                            value={this.state.SMTPLogin}
                            name="SMTPLogin"
                            onChange={this.handleChange}
                            required
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                  <Col md={4} xs={12} lg={4}>
                    <Form.Group>
                      <Row>
                        <Col md={12}>
                          <p className="fontSize">SMTP Password</p>
                        </Col>
                        <Col md={12}>
                          <Form.Control
                            type="text"
                            placeholder="SMTP Password"
                            value={this.state.SMTPPassword}
                            name="SMTPPassword"
                            onChange={this.handleChange}
                            required
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
                <br />

                <Row>
                  <Col md={3}>
                    <h6>
                      Address Verification
                      <span>
                        {this.state.addressVerification ? "On" : "OFF"}
                      </span>
                    </h6>
                  </Col>
                  <Col md={3}>
                    <Switch
                      onChange={this.handleSwitch}
                      checked={this.state.addressVerification}
                      className="react-switch"
                    />
                  </Col>
                  <Col md={3}>
                    <h6>Current Organization Type </h6>
                  </Col>
                  <Col md={3}>
                    <DropdownButton
                      onSelect={this.handleType}
                      variant="info"
                      style={{
                        color: "white",
                      }}
                      title={
                        this.state.activeOrganizationType ? (
                          <span style={{ color: "white" }}>
                            {this.state.activeOrganizationType}
                          </span>
                        ) : (
                          <span style={{ color: "white" }}>Select Type</span>
                        )
                      }
                    >
                      <Dropdown.Item
                        style={{ backgroundColor: "#17a2b8", color: "white" }}
                        eventKey="Charity"
                      >
                        Charity
                      </Dropdown.Item>
                      <Dropdown.Item
                        style={{ backgroundColor: "#17a2b8", color: "white" }}
                        eventKey="Church"
                      >
                        Church
                      </Dropdown.Item>
                      <Dropdown.Item
                        style={{ backgroundColor: "#17a2b8", color: "white" }}
                        eventKey="Private"
                      >
                        Private
                      </Dropdown.Item>
                      <Dropdown.Item
                        style={{ backgroundColor: "#17a2b8", color: "white" }}
                        eventKey="Not-For-Profit"
                      >
                        Not-For-Profit
                      </Dropdown.Item>
                      <Dropdown.Item
                        style={{ backgroundColor: "#17a2b8", color: "white" }}
                        eventKey="Others"
                      >
                        Others
                      </Dropdown.Item>
                    </DropdownButton>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col md={3}>
                    <h6>Upload Oranization Logo</h6>
                  </Col>
                  <Col md={4} xs={4}>
                    <div className="input-group">
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="inputGroupFile01"
                          aria-describedby="inputGroupFileAddon01"
                          onChange={this.onFileChange}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="inputGroupFile01"
                        >
                          Choose file
                          {/* <PublishIcon className="ml-2" /> */}
                        </label>
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <h6>{this.state.imageFile}</h6>
                  </Col>
                </Row>
              </div>

              <Button
                variant="default"
                className="mt-2"
                type="submit"
                size="lg"
                block
                style={{
                  color: "white",
                  background:
                    "linear-gradient(to bottom,#004d40 0%, #009688 100%)",
                }}
              >
                {this.props.NewOrganization ? "Save" : "Update"}
              </Button>

              {!this.props.NewOrganization && (
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
      );
  }
}

export default Organization;
