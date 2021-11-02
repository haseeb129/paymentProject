import React, { Component } from "react";
import { Row, Col } from "react-bootstrap/";
import Sidebar from "./Sidebar";
import Organization from "./Organization";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
class Dashboard extends Component {
  state = {
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
  };

  componentDidMount() {
    // const { admin } = this.props;
    const admin = {};
    console.log("Mounting", this.props.admin);
    this.setState({
      displayName: admin.displayName,
      email: admin.email,
      businessName: admin.businessName,
      businessNumber: admin.businessNumber,
      addressVerification: admin.addressVerification,
      activeOrganizationType: admin.activeOrganizationType,
      squareProductionKey: admin.squareProductionKey,
      squareSandBoxKey: admin.squareSandBoxKey,
      stripePrivateKey: admin.stripePrivateKey,
      stripePublishableKey: admin.stripePublishableKey,
      paymentMethod: admin.stripeEnabled ? "stripeMethod" : "squareMethod",
      stripeEnabled: admin.stripeEnabled,
      primaryName: "",
      primaryAddress: "",
      primaryEmail: "",
      primaryPhoneNumber: "",
      secondaryName: "",
      secondaryAddress: "",
      secondaryEmail: "",
      secondaryPhoneNumber: "",
    });
  }
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
  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ updated: false, error: false, waiting: true });
    axios
      .post("http://192.168.18.8:6001/myapp/api/admin/add", this.state)
      .then((response) => {
        this.setState({ updated: true, error: false, waiting: false });
        console.log("Response", response.data.message);
      })
      .catch((err) => {
        this.setState({ updated: false, error: true, waiting: false });
        console.log("ERROR ", err);
      });
    // console.log(this.state);
  };

  handleType = (e) => {
    this.setState({ activeOrganizationType: e });
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
            <Col md={9} sm={12} lg={8} className="mt-2  mb-2">
              <Organization />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Dashboard;
