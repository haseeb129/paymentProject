import React, { Component } from "react";
import NumberFormat from "react-number-format";
import {
  Dropdown,
  DropdownButton,
  Form,
  Row,
  InputGroup,
  Col,
} from "react-bootstrap/";
import DeleteIcon from "@material-ui/icons/Delete";

import IconButton from "@material-ui/core/IconButton";

class FundComponent extends Component {
  state = {
    otherType: false,
    availableFundTypesToShow: [],
    adminSetting: this.props.adminSetting,
    // types=["Donation","Membership","Tithes","Offering","General","Others"]
  };

  availableFundTypes = () => {
    const { adminSetting } = this.props;
    if (adminSetting.activeOrganizationType == "Private")
      return ["Membership", "Other"];
    else if (adminSetting.activeOrganizationType == "Church")
      return ["Tithe", "Offering", "General", "Other"];
    else if (adminSetting.activeOrganizationType == "Not-For-Profit")
      return ["Membership", "Donation", "Other"];
    else if (adminSetting.activeOrganizationType == "Charity")
      return ["Donation", "Other"];
    else if (adminSetting.activeOrganizationType == "Others")
      return [
        "Tithe",
        "Offering",
        "General",
        "Donation",
        "Membership",
        "Other",
      ];
  };

  componentDidMount() {
    console.log("Fund Component", this.props.adminSetting);
    const fundsArray = this.availableFundTypes();
    this.setState({ availableFundTypesToShow: fundsArray });
  }
  render() {
    const { adminSetting } = this.props;
    // const adminSetting = { activeOrganizationType: "Charity" };
    return (
      <Row>
        <Col xs={12} lg={12} md={12}>
          <Row>
            <Col className="mb-1" xs={4} lg={4} md={4}>
              <h6 className="mt-1">Fund Type</h6>
              <DropdownButton
                variant="info"
                block
                onSelect={(event) => {
                  if (event === "Others") this.setState({ otherType: true });
                  else this.setState({ otherType: false });

                  this.props.onFundType(this.props.idx, event);
                }}
                id="dropdown-basic-button"
                title={
                  this.props.field.fundType
                    ? this.props.field.fundType
                    : "Select Type"
                }
              >
                {/* {adminSetting.activeOrganizationType === "Charity" && (
                  <Dropdown.Item
                    style={{ backgroundColor: "#17a2b8", color: "white" }}
                    eventKey="Donation"
                  >
                    Donation
                  </Dropdown.Item>
                )}
                {adminSetting.activeOrganizationType === "Others" && (
                  <Dropdown.Item eventKey="Membership">
                    Membership
                  </Dropdown.Item>
                )}

                {adminSetting.activeOrganizationType === "Church" && (
                  <Dropdown.Item eventKey="Tithes">Tithes</Dropdown.Item>
                )}

                {adminSetting.activeOrganizationType === "Church" && (
                  <Dropdown.Item eventKey="Offering">Offering</Dropdown.Item>
                )}
                {adminSetting.activeOrganizationType === "Church" && (
                  <Dropdown.Item eventKey="General">General</Dropdown.Item>
                )}

                <Dropdown.Item eventKey="Others">Others</Dropdown.Item>
               */}

                {this.state.availableFundTypesToShow.map((element) => {
                  return (
                    <Dropdown.Item eventKey={element}>{element}</Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </Col>
            {this.state.otherType && (
              <Col xs={5} lg={5} md={5}>
                <h6 className="mt-1">Enter Fund Type</h6>
                <Form.Control
                  placeholder="Fund Type"
                  type="text"
                  required
                  onChange={(event) => {
                    this.props.onFundType(this.props.idx, event.target.value);
                  }}
                />
              </Col>
            )}

            <Col xs={5} lg={5} md={9}>
              <h6 className="mt-1">Amount</h6>

              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                </InputGroup.Prepend>

                <NumberFormat
                  customInput={Form.Control}
                  placeholder="Amount"
                  onBlur={(event) => {
                    this.props.onBlurChange(this.props.idx, event);
                  }}
                  disabled={this.props.field.fundType === "" ? true : false}
                  required
                  name="amount"
                  value={this.props.field.amount}
                  onChange={(event) =>
                    this.props.onFundChange(this.props.idx, event)
                  }
                />
              </InputGroup>
            </Col>

            <Col xs={1} lg={1} md={1}>
              {this.props.idx !== 0 && (
                <IconButton
                  style={{ marginTop: "25px" }}
                  onClick={() => this.props.onDelete(this.props.idx)}
                  color="secondary"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default FundComponent;
