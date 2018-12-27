import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import PostForm from "./PostForm";
import PostFeed from './PostFeed';
import {getPost} from '../../actions/postAction';

class Posts extends Component {
  componentDidMount(){
    this.props.getPost();
  }
  render() {
    const {post,loading} = this.props;
    let postContent;
    if(post===null||loading){
      postContent = <Spinner/>
    }else{
      postContent = <PostFeed posts={post}/>
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Posts.propTypes = {
  getPost:PropTypes.func.isRequired,
  post:PropTypes.object.isRequired
}
const mapStateToProps = state =>({
  post: state.post,
})
export default connect(mapStateToProps,{getPost})(Posts);
