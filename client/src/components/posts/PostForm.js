import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import TextAreafieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../actions/postAction";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
  }
  render() {
    return <div />;
  }
}

export default PostForm;
