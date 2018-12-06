import React, { Component } from "react";
//import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classNames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    //this.setState({ [e.target.name]: e.target.value });
    const newUser = {
      email: e.target.email.value,
      password: e.target.password.value
    };
    this.props.loginUser(newUser);
    /*
    axios
      .post("/api/users/login", newUser)
      .then(res => console.log(res.data))
      .catch(err => {
        this.setState({ errors: err.response.data });
        console.log(err.response.data);
      });
      */
  }

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your Developer account
              </p>
              <form action="#" onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classNames(
                      "form-control form-control-lg",
                      this.state.errors.email ? "is-invalid" : ""
                    )}
                    placeholder="Email Address"
                    name="email"
                  />
                  {this.state.errors.email && (
                    <div className="invalid-feedback">
                      {this.state.errors.email}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classNames(
                      "form-control form-control-lg",
                      this.state.errors.password ? "is-invalid" : ""
                    )}
                    placeholder="Password"
                    name="password"
                  />
                  {this.state.errors.password && (
                    <div className="invalid-feedback">
                      {this.state.errors.password}
                    </div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
