import React, { Component } from "react";
import {
  Button,
  Alert,
  Form,
  Row,
  Col,
  Dropdown,
  DropdownButton,
} from "react-bootstrap/";
import StriptForm from "./payment_form/StripeForm";
import FundComponent from "./FundComponent";
import SquareForm from "./payment_form/SquareForm";
import axios from "axios";
import auth from "./authService";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import MaterialButton from "@material-ui/core/Button";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import SignIn from "./SignIn";

export default class OrganizationHomePage extends Component {
  state = {
    firstName: null,
    lastName: null,
    recurring: false,
    streetAddress: null,
    email: null,
    phoneNumber: null,
    zipCode: null,
    total: 0,
    funds: [{ fundType: "", amount: "" }],
    FormData: null,
    User: null,
    // auth.getCurrentUser() &&
    // auth.getCurrentUser().route === this.props.admin.auth.route
    //   ? auth.getCurrentUser()
    //   : null,
    adminSetting: this.props.admin,
    missing: false,
    show: true,
    example: null,
    previousTotal: null,
    recurringwithLoginCheck: null,
    recurringwithLogin: false,

    recurringDuration: "Monthly Recurring Payment",
  };
  handleExample = (e) => {
    if (e.target.value > 0 || e.target.value === "")
      this.setState({ example: e.target.value });
  };

  handleBlurExample = (e) => {
    var num = parseFloat(this.state.example);
    var cleanNum = num.toFixed(2);
    this.setState({ example: cleanNum });
  };

  componentDidMount() {
    const { User } = this.state;
    // console.log("Home Admin Daynamic Props", this.state.adminSetting);
    console.log("User,User", User);
    console.log("Adminsetting homepage", this.state.adminSetting);

    if (User) {
      this.setState({ firstName: User.firstName });
      this.setState({ lastName: User.lastName });
      this.setState({});
    }
  }
  getSquareFormData = (data) => {
    if (data) {
      console.log("Square form Data", data);

      this.setState({ FormData: data });
    }
  };
  getStripeFormData = (data) => {
    if (data) {
      console.log("Stipe form Data", data);
      const { number, month, year, cvc } = data;

      this.setState({ FormData: data }, () => {
        console.log("Final state", this.state);
      });
    }
  };
  handleCheck = (event) => {
    const { recurring } = this.state;
    this.setState({ recurring: !recurring });
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleAdd = () => {
    console.log("State", this.state);
    var { funds, previousTotal } = this.state;
    let lastId = funds.length - 1;
    if (funds[lastId].amount !== null && funds[lastId].amount !== "") {
      funds.push({ fundType: "", amount: "" });
      this.setState({ funds });
      this.setState({ total: previousTotal });
    }
  };

  handleDelete = (index) => {
    const UpdateArray = this.state.funds.filter(
      (s, sindex) => index !== sindex
    );
    var updateTotal = this.state.total;
    updateTotal = updateTotal - parseInt(this.state.funds[index].amount);
    console.log("updateTotal", updateTotal);
    this.setState({ total: updateTotal });
    this.setState({ funds: UpdateArray });
  };

  handleFundChange = async (index, event) => {
    const UpdateArray = this.state.funds;
    if (UpdateArray[index].fundType !== "") {
      if (event.target.value > 0 || event.target.value === "") {
        UpdateArray[index].amount = isNaN(event.target.value)
          ? 0
          : event.target.value;
        this.setState({ funds: UpdateArray }, () => {
          this.calculate_amount(this.state.previousTotal);
        });
      }
    }
  };

  handleDuration = (duration) => {
    console.log("E", duration);
    this.setState({ recurringDuration: duration });
  };
  handleType = async (index, event) => {
    // console.log("Event ", event);
    const UpdateArray = this.state.funds;
    UpdateArray[index].fundType = event;
    this.setState({ funds: UpdateArray });
  };
  handleBlur = (idx, event) => {
    // console.log("BLUR", idx, event);
    const { funds } = this.state;
    var num = parseFloat(funds[idx].amount);
    var cleanNum = num.toFixed(2);
    funds[idx].amount = cleanNum;
    this.setState({ funds }, () => console.log(this.state.funds));
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ missing: false });
    const { funds } = this.state;
    if (
      funds[0].amount !== null &&
      funds[0].amount !== "" &&
      this.state.recurringwithLoginCheck
    ) {
      this.setState({ show: false }, () =>
        console.log("this.state", this.state)
      );
    } else {
      this.setState({ missing: true });
    }
  };

  convert_float = async (value) => {
    return parseFloat(value);
  };
  calculate_amount = async () => {
    var sum1 = 0;

    const array = this.state.funds;
    const sum = array.map(async (element) => {
      var x = await this.convert_float(element.amount);
      console.log("x type", x);
      console.log("Y type", typeof y);
      console.log("X type", typeof x);
      sum1 = sum1 + x;
      console.log("Total", sum1);
      if (isNaN(sum1) || sum1 === 0) this.setState({ total: x });
      else
        this.setState({ total: sum1 }, () => {
          console.log("After setting state", this.state.total);
        });
    });
  };
  changeForm = () => {
    var a = this.state.show;
    this.setState({ show: !a });
  };

  handleRadio = (event) => {
    console.log("target.name", event.target.name);
    const target = event.target;
    if (target.value === "recurringWithoutLogin")
      this.setState({ recurringwithLogin: false });
    else this.setState({ recurringwithLogin: true });
    this.setState(
      {
        [target.name]: target.value,
      },
      () => {
        console.log("State", this.state);
      }
    );
  };

  render() {
    if (this.state.show)
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
            {/* {this.props.admin._id && ( */}
            <Row>
              <Col>
                <Form
                  onSubmit={this.handleSubmit}
                  style={{ minHeight: "100vh" }}
                  className="customfont"
                >
                  <Row style={{ minHeight: "100vh" }} lg={11} md={11} xs={10}>
                    <Col lg={5} md={5} xs={8} className="mt-3 ml-2">
                      {this.state.funds.map((field, idx) => {
                        return (
                          <FundComponent
                            adminSetting={this.props.admin}
                            key={`${field}-${idx}`}
                            onDelete={this.handleDelete}
                            onFundChange={this.handleFundChange}
                            onFundType={this.handleType}
                            onBlurChange={this.handleBlur}
                            idx={idx}
                            field={field}
                          />
                        );
                      })}

                      <MaterialButton
                        onClick={this.handleAdd}
                        style={{ paddingLeft: "15px" }}
                        color="default"
                        startIcon={<ControlPointIcon />}
                      >
                        <p style={{ paddingTop: "20px" }}>Add New Item</p>
                      </MaterialButton>
                      {this.state.missing && (
                        <Alert variant="danger">
                          Fund Type Or Amount Missing{" "}
                        </Alert>
                      )}
                      {this.state.total > 0 && (
                        <Row className="mb-3 ml-0">
                          <Col lg={6} md={6} xs={4}>
                            <h6> Total Amount:</h6>
                          </Col>

                          <Col lg={6} md={6} xs={5}>
                            <h6> {this.state.total}</h6>
                          </Col>
                        </Row>
                      )}

                      <Row className="mb-2 ml-0">
                        <Col lg={10} md={12} xs={12}>
                          <Form.Check
                            type="checkbox"
                            checked={this.state.recurring}
                            label="Make this payment a recurring amount each month."
                            onChange={this.handleCheck}
                          />
                        </Col>
                      </Row>
                      {this.state.recurring && (
                        <Row className="mt-1 mt-2 mb-3 ml-0">
                          <Col md={12} xs={12} lg={12}>
                            <DropdownButton
                              onSelect={this.handleDuration}
                              variant="info"
                              // defaultChecked={this.state.recurringDuration}
                              // defaultValue={this.state.recurringDuration}
                              style={{
                                color: "white",
                              }}
                              title={
                                this.state.recurringDuration ? (
                                  <span style={{ color: "white" }}>
                                    {this.state.recurringDuration}
                                  </span>
                                ) : (
                                  <span style={{ color: "white" }}>Select</span>
                                )
                              }
                            >
                              <Dropdown.Item
                                style={{
                                  backgroundColor: "#17a2b8",
                                  color: "white",
                                }}
                                eventKey="Weekly Recurring Payment"
                              >
                                Weekly Recurring Payment
                              </Dropdown.Item>
                              <Dropdown.Item
                                style={{
                                  backgroundColor: "#17a2b8",
                                  color: "white",
                                }}
                                eventKey="Monthly Recurring Payment"
                              >
                                Monthly Recurring Payment
                              </Dropdown.Item>
                            </DropdownButton>
                          </Col>
                        </Row>
                      )}

                      {this.state.recurring && !this.state.User && (
                        <Row className="mb-2 ml-0">
                          <Col md={12} xs={12} lg={12}>
                            <h6>
                              <Form.Check
                                type="radio"
                                // checked={this.state.paymentMethod === "stripeMethod"}
                                name="recurringwithLoginCheck"
                                label="Setup recurring payments without creating a login"
                                value="recurringWithoutLogin"
                                className="mt-1"
                                onChange={this.handleRadio}
                              />
                            </h6>
                          </Col>

                          <Col md={12} xs={12} lg={12}>
                            <p className="mt-1" style={{ fontSize: "80%" }}>
                              (With this option, payments would occur same time
                              every week/month.Payee will need to contact to the
                              organization to update subscription,update credit
                              card or to cancel subscription)
                            </p>
                          </Col>
                        </Row>
                      )}
                      {this.state.recurring && !this.state.User && (
                        <Row className="mb-2 ml-0">
                          <Col md={12} xs={12} lg={12}>
                            <h6>
                              <Form.Check
                                type="radio"
                                // checked={this.state.paymentMethod === "stripeMethod"}
                                name="recurringwithLoginCheck"
                                label="Setup recurring payments by creating an account to login"
                                value="recurringWithLogin"
                                className="mt-1"
                                onChange={this.handleRadio}
                              />
                            </h6>
                          </Col>

                          <Col md={12} xs={12} lg={12}>
                            <p className="mt-1" style={{ fontSize: "80%" }}>
                              (With this option, payments would occur same time
                              every week/month.Payee will manage update to
                              credit card Information, update address, update
                              subscription, cancel subscription, view history of
                              transactions.)
                            </p>
                          </Col>

                          <Col md={12} xs={12} lg={12}>
                            {!this.state.recurringwithLoginCheck && (
                              <Alert variant="danger">Select Option </Alert>
                            )}
                          </Col>
                        </Row>
                      )}
                      {this.state.recurringwithLogin && (
                        <Row className="mb-2 ml-0">
                          <Col md={6} xs={6} lg={6}>
                            <Link to={"/signin"}>
                              <Button variant="info" block>
                                login
                              </Button>
                            </Link>
                          </Col>

                          <Col md={6} xs={6} lg={6}>
                            <Link to={"/signup"}>
                              <Button variant="info" block>
                                SignUp
                              </Button>
                            </Link>
                          </Col>
                        </Row>
                      )}
                    </Col>

                    <Col lg={5} md={5} xs={8} className="mt-3 ml-3">
                      <Row
                        className="pb-2 pt-2 pr-0"
                        style={{ backgroundColor: "#9FA8A3" }}
                      >
                        <Col>
                          <Row>
                            <Col md={10}>
                              <h3>Billing Information</h3>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col lg={6} md={6} xs={6}>
                              <Form.Control
                                placeholder="First Name"
                                type="text"
                                value={this.state.firstName}
                                name="firstName"
                                onChange={this.handleChange}
                                required
                              />
                            </Col>

                            <Col lg={6} md={6} xs={6}>
                              <Form.Control
                                placeholder="Last Name"
                                type="text"
                                required
                                value={this.state.lastName}
                                name="lastName"
                                onChange={this.handleChange}
                              />
                            </Col>
                          </Row>
                          <Row className="mt-3 mb-3">
                            <Col lg={6} md={6} xs={6}>
                              <Form.Control
                                placeholder="Street Address"
                                type="text"
                                required
                                value={this.state.streetAddress}
                                name="streetAddress"
                                onChange={this.handleChange}
                              />
                            </Col>

                            <Col lg={6} md={6} xs={6}>
                              <Form.Control
                                placeholder="Zip Code"
                                type="text"
                                required
                                value={this.state.zipCode}
                                name="zipCode"
                                onChange={this.handleChange}
                              />
                            </Col>
                          </Row>
                          <Row className="mt-2 mb-2">
                            <Col lg={6} md={6} xs={6}>
                              <Form.Control
                                placeholder="Email Address"
                                type="text"
                                value={this.state.email}
                                name="email"
                                onChange={this.handleChange}
                                required
                              />
                            </Col>

                            <Col lg={6} md={6} xs={6}>
                              <Form.Control
                                placeholder="Phone (optional)"
                                type="text"
                                value={this.state.phoneNumber}
                                name="phoneNumber"
                                onChange={this.handleChange}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="mt-4 ">
                        <Col className="p-0">
                          <Button
                            type="submit"
                            size="lg"
                            block
                            variant="info"
                            // onClick={this.changeForm}
                          >
                            Next
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>

            {!this.props.admin._id && (
              <Row>
                <Col>
                  <h1>admin has not provided any information</h1>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      );
    else if (!this.state.show)
      return (
        <Row>
          <Col md={12}>
            <Row className="p-0">
              <Col md={12} lg={12} sm={12} className="p-0 ">
                <Navbar
                  user={this.state.user}
                  adminSetting={this.state.adminSetting}
                />
              </Col>
            </Row>
          </Col>

          <Col md={12}>
            <Row style={{ minHeight: "100vh" }} lg={10} md={10} xs={10}>
              <Col lg={9} md={12} xs={8} className="mt-3 ml-3">
                {this.state.adminSetting.stripeEnabled && (
                  <StriptForm
                    submitData={this.getStripeFormData}
                    backButton={this.changeForm}
                    total={this.state.total}
                  />
                )}
                {!this.state.adminSetting.stripeEnabled && (
                  <SquareForm
                    details={this.state}
                    total={this.state.total}
                    backButton={this.changeForm}
                    sentData={this.getSquareFormData}
                  />
                )}
              </Col>

              <Col lg={5} md={5} xs={10} className="mt-3 ml-3"></Col>
            </Row>
          </Col>
        </Row>
      );
  }
}
