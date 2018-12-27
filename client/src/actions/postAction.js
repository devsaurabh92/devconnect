import axios from "axios";
import {
  ADD_POST,
  GET_ERRORS,
  GET_POST,
  GET_SINGLE_POST,
  POST_LOADING,
  DELETE_POST
} from "./types";

// Add Post
export const addPost = postData => dispatch => {
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// GET Post
export const getPost = () => dispatch => {
  setPostLoading();
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: []
      })
    );
};
// GET Post
export const getSinglePost = id => dispatch => {
  setPostLoading();
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_SINGLE_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SINGLE_POST,
        payload: null
      })
    );
};
//DELETE POST
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//LIKE POST
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPost()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//UNLIKE POST
export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPost()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_SINGLE_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// GET Post
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
