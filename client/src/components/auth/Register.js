import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
//import classNames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
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
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      password2: e.target.password2.value
    };
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Developer account</p>
              <form action="create-profile.html" onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  type="text"
                  name="name"
                  error={this.state.errors.name}
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  error={this.state.errors.email}
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Password"
                  type="password"
                  name="password"
                  error={this.state.errors.password}
                  value={this.state.password}
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  placeholder="Confirm Password"
                  type="password"
                  name="password2"
                  error={this.state.errors.password2}
                  value={this.state.password2}
                  onChange={this.onChange}
                />
                {/*}
                <div className="form-group">
                  <input
                    type="text"
                    className={classNames(
                      "form-control form-control-lg",
                      this.state.errors.name ? "is-invalid" : ""
                    )}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />

                  {this.state.errors.name && (
                    <div className="invalid-feedback">
                      {this.state.errors.name}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classNames(
                      "form-control form-control-lg",
                      this.state.errors.email ? "is-invalid" : ""
                    )}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {this.state.errors.email && (
                    <div className="invalid-feedback">
                      {this.state.errors.email}
                    </div>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
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
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {this.state.errors.password && (
                    <div className="invalid-feedback">
                      {this.state.errors.password}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classNames(
                      "form-control form-control-lg",
                      this.state.errors.password2 ? "is-invalid" : ""
                    )}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {this.state.errors.password2 && (
                    <div className="invalid-feedback">
                      {this.state.errors.password2}
                    </div>
                  )}
                </div>
                {*/}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
