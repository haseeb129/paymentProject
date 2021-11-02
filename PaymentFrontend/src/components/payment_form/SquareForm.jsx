import React from "react";
import "./SquareFormStyle.css";
import { Alert, Button, Row, Col } from "react-bootstrap/";
import {
  SquarePaymentForm,
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardPostalCodeInput,
  CreditCardCVVInput,
  CreditCardSubmitButton,
} from "react-square-payment-form";

export default class SquareForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: [],
      receivedToken: false,
    };
  }

  cardNonceResponseReceived = (
    errors,
    nonce,
    cardData,
    buyerVerificationToken
  ) => {
    if (errors) {
      this.setState({ errorMessages: errors.map((error) => error.message) });
      return;
    }
    this.setState({ errorMessages: [] });

    this.setState({ receivedToken: true });
    this.props.sentData({
      cardData,
      nonce: nonce,
      buyerVerificationToken: buyerVerificationToken,
    });
  };
  createVerificationDetails() {
    return {
      amount: this.props.total,
      currencyCode: "USD",
      intent: "CHARGE",
      billingContact: {
        familyName: "Smith",
        givenName: "John",
        email: "jsmith@example.com",
        country: "GB",
        city: "London",
        addressLines: ["1235 Emperor's Gate"],
        postalCode: "SW7 4JA",
        phone: "020 7946 0532",
      },
    };
  }

  render() {
    return (
      <Row>
        <Col lg={6} md={6} xs={10} style={{ backgroundColor: "#9FA8A3" }}>
          <Row className="contentCenter mt-2">
            <Col>
              <h3 style={{ textAlign: "center" }}>Payment Information</h3>
            </Col>
          </Row>

          <Row>
            <Col className="contentCenter">
              <SquarePaymentForm
                sandbox={true}
                applicationId={process.env.applicationId}
                locationId={process.env.LQTJ5APXQYJKQ}
                cardNonceResponseReceived={this.cardNonceResponseReceived}
                createVerificationDetails={this.createVerificationDetails}
              >
                <Row>
                  <Col lg={6} md={6} xs={8} className="sq-fieldset ml-3">
                    <CreditCardNumberInput />
                  </Col>
                </Row>

                <Row className="sq-fieldset">
                  <Col className="sq-form-third" lg={3} md={3} xs={3}>
                    <CreditCardExpirationDateInput />
                  </Col>
                  <Col className="sq-form-third" lg={3} md={3} xs={3}>
                    <CreditCardPostalCodeInput />
                  </Col>

                  <Col className="sq-form-third" lg={3} md={3} xs={3}>
                    <CreditCardCVVInput />
                  </Col>
                </Row>

                {!this.state.receivedToken && (
                  <Row className="button1">
                    <Col lg={12} md={12} xs={12} className="button1">
                      <CreditCardSubmitButton className="button1">
                        {this.props.total}
                      </CreditCardSubmitButton>
                    </Col>
                    <Col lg={12} md={12} xs={12}>
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
                    </Col>
                  </Row>
                )}

                {this.state.receivedToken && (
                  <Row>
                    <br />
                    <Col lg={12} md={12} xs={12}>
                      <Alert variant="success"> Successful payment</Alert>
                    </Col>
                  </Row>
                )}
              </SquarePaymentForm>
            </Col>
          </Row>
          <Row>
            <Col lg={10} md={8} sx={10}>
              <div className="sq-error-message mb-4">
                {this.state.errorMessages.map((errorMessage) => (
                  <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
                ))}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
