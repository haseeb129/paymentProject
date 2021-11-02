import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./components/admin_panel/Dashboard";
import UserList from "./components/admin_panel/UserList";
import EditProfile from "./components/admin_panel/EditProfile";
import OrganizationHomePage from "./components/OrganizationHomePage";
import "./index.css";
import LandingPage from "./components/LandingPage";
import StripeForm from "./components/payment_form/StripeForm";
import SquareForm from "./components/payment_form/SquareForm";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import auth from "./components/authService";
import org from "./components/admin_panel/Organization";

import axios from "axios";
import Navbar from "./components/Navbar";
import SuperAdminDashboard from "./components/admin_panel/Super Admin/SuperAdminDashboard";

import SuperAdminEditProfile from "./components/admin_panel/Super Admin/SuperAdminEditProfile";
import SuperAdminPending from "./components/admin_panel/Super Admin/SuperAdminPending";
import SuperAdminUserList from "./components/admin_panel/Super Admin/SuperAdminUserList";
// import Receipt from "./components/Receipt";
import Print from "./components/Receipt";

class App extends Component {
  state = {
    roles: [],
    organizationDetails: [],
    user: auth.getCurrentUser(),
    adminSetting: null,
  };
  componentDidMount() {
    axios
      .get("http://192.168.18.8:6001/myapp/api/admin/getAll")
      .then((response) => {
        console.log("organization details ", response.data.organizations);
        this.setState({ organizationDetails: response.data.organizations });
      })
      .catch((err) => {
        console.log("organization details", err.response);
      });

    axios
      .get("http://192.168.18.8:6001/myapp/api/roles")
      .then((response) => {
        console.log("Roles", response.data);
        this.setState({ roles: response.data.roles });
      })
      .catch((err) => {
        console.log("Roles Erro", err);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <div
            className=" container pr-0"
            style={{ minHeight: "100vh", minWidth: "100vh" }}
          >
            {/* <Navbar adminSetting={}/> */}
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/receipt" component={Print} />

              {/* Exmaples*/}
              <Route exact path="/example4" component={StripeForm} />
              <Route exact path="/example41" component={SquareForm} />
              <Route exact path="/example3" component={EditProfile} />
              <Route exact path="/example1" component={UserList} />
              <Route exact path="/example2" component={Dashboard} />
              <Route exact path="/org" component={org} />

              {/* <Route exact path="/Dumy" component={OrganizationHomePage} /> */}

              {/* <Route
                path="/example"
                render={(props) => (
                  <Dashboard {...props} admin={this.state.adminSetting} />
                )}
              /> */}

              {/* Super Admin routes */}
              <Route exact path="/superAdmin" component={SuperAdminDashboard} />
              <Route
                exact
                path="/superAdminUserList"
                component={SuperAdminUserList}
              />
              <Route
                exact
                path="/superAdminEditProfile"
                component={SuperAdminEditProfile}
              />
              <Route
                exact
                path="/superAdminPending"
                component={SuperAdminPending}
              />

              {/* Admin routes */}
              <Route
                exact
                path="/admin"
                render={(props) => {
                  if (this.state.user && this.state.user.isAdmin)
                    return <Redirect to="/admin/dashboard" />;
                  else return <Redirect to="/SignIn" />;
                }}
              />
              <Route
                path="/admin/dashboard"
                render={(props) => {
                  if (this.state.user && this.state.user.isAdmin)
                    return <Dashboard admin={this.state.adminSetting} />;
                  else return <Redirect to="/SignIn" />;
                }}
              />
              <Route
                path="/admin/userlist"
                render={(props) => {
                  if (this.state.user && this.state.user.isAdmin)
                    return <UserList {...props} />;
                  else return <Redirect to="/SignIn" />;
                }}
              />
              <Route
                path="/admin/editProfile"
                render={(props) => {
                  if (this.state.user && this.state.user.isAdmin)
                    return <EditProfile {...props} />;
                  else return <Redirect to="/SignIn" />;
                }}
              />

              {/* Dynamic routes */}
              {this.state.organizationDetails.map((element) => {
                if (element.auth.route) {
                  let route = "/" + element.auth.route;
                  return (
                    <Route
                      exact
                      path={route}
                      component={() => <OrganizationHomePage admin={element} />}
                    />
                  );
                }
              })}

              {/* Auth routes */}
              <Route
                path="/:OrgID/signin"
                render={(props) => {
                  if (this.state.user) return <Redirect to="/" />;
                  else return <SignIn {...props} />;
                }}
              />

              <Route
                path="/:OrgID/signup"
                render={(props) => {
                  if (this.state.user) return <Redirect to="/" />;
                  else return <SignUp {...props} />;
                }}
              />
            </Switch>
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
