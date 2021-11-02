import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import ReactToPrint from "react-to-print";
class Receipt extends Component {
  render() {
    return (
      <div className="mt-5">
        <Row className="pl-4">
          <Col md={10} lg={10} xs={12}>
            <h3>Receipt</h3>
            <hr />
            <Row className="mt-5">
              <Col className="bold" md={9} xs={9}>
                Receipt Number
              </Col>
              <Col md={3} xs={3}>
                12454121
              </Col>
            </Row>
            <hr />

            <Row className="mt-5">
              <Col md={3} xs={3}>
                <Row>
                  <Col className="bold mb-3">Date</Col>
                </Row>

                <Row>
                  <Col>6/16/2020</Col>
                </Row>
              </Col>
              <Col md={3} xs={3}>
                <Row>
                  <Col className="bold mb-3">Description</Col>
                </Row>

                <Row>
                  <Col>Payment Received</Col>
                </Row>
              </Col>
              <Col md={3} xs={3}>
                <Row>
                  <Col className="bold mb-3">Payment Type</Col>
                </Row>

                <Row>
                  <Col>General</Col>
                </Row>
              </Col>
              <Col md={3} xs={3}>
                <Row>
                  <Col className="bold mb-3">Amount</Col>
                </Row>

                <Row>
                  <Col>$45</Col>
                </Row>
              </Col>
            </Row>
            <hr />

            <Row className="mt-5">
              <Col className="bold mb-3" md={9} xs={9}>
                Business Name
              </Col>
              <Col md={3} xs={3}>
                XYZ
              </Col>
            </Row>
            <hr />
            <Row className="mt-5">
              <Col className="bold mb-3" md={9} xs={9}>
                Business Number
              </Col>
              <Col md={3} xs={3}>
                +313445656565454
              </Col>
            </Row>
            <hr />
          </Col>
        </Row>
      </div>
    );
  }
}
class Print extends React.Component {
  render() {
    return (
      <div>
        <Receipt ref={(el) => (this.componentRef = el)} />
        <Row className="centerButton">
          <ReactToPrint
            trigger={() => (
              <Button
                className="centerItem"
                style={{
                  color: "white",
                  background:
                    "linear-gradient(to bottom,#004d40 0%, #009688 100%)",
                }}
              >
                Save Receipt
              </Button>
            )}
            content={() => this.componentRef}
          />
        </Row>
      </div>
    );
  }
}

export default Print;
