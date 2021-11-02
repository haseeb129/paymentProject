import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Alert, Button, Form, Row, Col } from "react-bootstrap/";
import NumberFormat from "react-number-format";
class StripeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardDetails: {},
      month: null,
      year: null,
      checkDate: true,
      cvc: "",
      number: "",
      monthArray: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  }

  // handleInputFocus = (e) => {
  //   this.setState({ focus: e.target.name });
  // };
  handleYear = (e) => {
    this.setState({ year: e });
  };
  handleMonth = (e) => {
    this.setState({ month: e });
  };

  year() {
    var x = [];
    var a = new Date().getFullYear().toString();
    a = parseInt(a);

    for (var i = a; i < a + 11; i++) {
      x.push(i.toString());
    }

    return x;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.month === null || this.state.year === null) {
      console.log("Missing Values");
      this.setState({ checkDate: false });
    } else {
      this.setState({ checkDate: true });
      console.log(this.state);
      this.props.submitData(this.state);
    }
  };
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Row className="mb-4">
        <Col lg={6} md={6} xs={10} style={{ backgroundColor: "#9FA8A3" }}>
          <Form onSubmit={this.handleSubmit} className="mt-2">
            <Row className="contentCenter">
              <Col>
                <h3 style={{ textAlign: "center" }}>Payment Information</h3>
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} xs={12}>
                <NumberFormat
                  customInput={Form.Control}
                  format="#### #### #### ####"
                  name="number"
                  placeholder="Card Number"
                  value={this.state.number}
                  onChange={this.handleInputChange}
                />
              </Col>
            </Row>

            <Row>
              <Col md={4} xs={4} lg={4}>
                <NumberFormat
                  customInput={Form.Control}
                  format="###"
                  name="cvc"
                  className="mt-2"
                  placeholder="CVC"
                  value={this.state.cvc}
                  onChange={this.handleInputChange}
                />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={4} lg={4} xs={4}>
                <h6 className="pt-2">Expiry Date</h6>
              </Col>

              <Col md={4} lg={4} xs={4}>
                <DropdownButton
                  variant="info"
                  onSelect={this.handleMonth}
                  title={
                    this.state.month ? (
                      <span style={{ color: "white" }}>{this.state.month}</span>
                    ) : (
                      <span style={{ color: "white" }}>Month</span>
                    )
                  }
                >
                  {this.state.monthArray.map((month) => {
                    return (
                      <Dropdown.Item
                        style={{ backgroundColor: "#17a2b8", color: "white" }}
                        eventKey={month}
                      >
                        {month}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
              </Col>
              <Col md={4} lg={4} xs={4}>
                <DropdownButton
                  variant="info"
                  onSelect={this.handleYear}
                  id="dropdown-basic-button"
                  title={
                    this.state.year ? (
                      <span style={{ color: "white" }}>{this.state.year}</span>
                    ) : (
                      <span style={{ color: "white" }}>Year</span>
                    )
                  }
                >
                  {this.year().map((year) => {
                    return (
                      <Dropdown.Item
                        style={{ backgroundColor: "#17a2b8", color: "white" }}
                        eventKey={year}
                      >
                        {year}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
              </Col>
            </Row>

            <Button
              className="mt-4 mb-4 "
              variant="default"
              type="submit"
              size="lg"
              block
              style={{
                color: "white",
                background:
                  "linear-gradient(to bottom,#004d40 0%, #009688 100%)",
              }}
            >
              <span>Give Now : $ {this.props.total}</span>
            </Button>

            <Button
              onClick={() => this.props.backButton()}
              className="mt-4 mb-4 "
              variant="info"
              type="submit"
              size="lg"
              block
            >
              Back
            </Button>
            {!this.state.checkDate && (
              <Alert variant="danger">Select Month Or Year</Alert>
            )}
          </Form>
        </Col>
      </Row>
    );
  }
}

export default StripeForm;
