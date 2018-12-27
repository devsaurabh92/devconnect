const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const passport = require("passport");

//Load post model
const Post = require("../../models/Post");

//Load post model
const Profile = require("../../models/Profile");

//Load Validation file
const validatePostInput = require("../../validation/posts");

//@route   api/posts/test
//@desc    Test posts route
//@access  public
router.get("/test", (req, res) => res.json({ msg: "Posts Works!" }));

//@route   api/get/
//@desc    get all posts
//@access  public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.send(posts))
    .catch(err => res.status(404).json(err));
});

//@route   api/get/:id
//@desc    get single posts
//@access  public
router.get("/:id", (req, res) => {
  console.log(req.params.id);

  Post.findById(req.params.id)
    .then(post => res.send(post))
    .catch(err => res.status(404).json({ nopostfound: "No Post Found" }));
});

//@route   api/posts/
//@desc    Create new posts
//@access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.send(post));
  }
);

//@route   api/posts/:id
//@desc    delete posts
//@access  private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res
              .status(404)
              .json({ notauthorised: "User not authorised" });
          }
          //Delete Post
          post.remove().then(() => res.send({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "No Post Found" }));
    });
  }
);

//@route   api/posts/like/:id
//@desc    like posts
//@access  private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //console.log(post);
          if (post.like.filter(like => like.user == req.user.id).length > 0) {
            return res
              .status(400)
              .json({ alreadylikes: "User already liked this post" });
          }
          // Add User Id to likes array
          post.like.unshift({ user: req.user.id });
          console.log(post);

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No Post Found" }));
    });
  }
);

//@route   api/posts/unlike/:id
//@desc    like posts
//@access  private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          console.log(post);
          if (post.like.filter(like => like.user == req.user.id).length === 0) {
            return res
              .status(400)
              .json({ notliked: "User not liked this post yet" });
          }
          // Add User Id to likes array
          const removeIndex = post.like
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          // Split out array
          post.like.splice(removeIndex, 1);
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No Post Found" }));
    });
  }
);

//@route   api/posts/comment/:id
//@desc    comment posts
//@access  private

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };
        //Add to comment array
        post.comments.unshift(newComment);
        post.save().then(post => res.send(post));
      })
      .catch(err => res.status(404).json({ nopostfound: "No Post Found" }));
  }
);

//@route   api/posts/comment/:id/:comment_id
//@desc    Remove comment from post
//@access  private

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.comments.filter(comment => comment._id == req.params.comment_id)
            .length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexist: "Comment does not exist" });
        }
        //GET remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);
        // Splice out comment from array
        post.comments.splice(removeIndex, 1);
        //save new array for cooment
        post.save().then(post => res.send(post));
      })
      .catch(err => res.status(404).json({ nopostfound: "No Post Found" }));
  }
);

module.exports = router;
