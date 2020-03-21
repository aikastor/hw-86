import React, {Component, Fragment} from 'react';
import PostForm from "../../components/PostForm/PostForm";
import {createPost} from "../../store/actions/postsActions";
import {connect} from "react-redux";

class NewPost extends Component {
  componentDidMount() {
    if(!this.props.user) {
      this.props.history.push('/login');
    }
  }

  createPost = async (postData) => {

    await this.props.createPost(postData);
    this.props.history.push('/');
  };

  render() {
    return (
      <Fragment>
        <h2>New post</h2>
        <PostForm
          onSubmit={this.createPost}
          author={this.props.user ? this.props.user._id : ''}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user
});

const mapDispatchToProps = dispatch => ({
  createPost: (postData) => dispatch(createPost(postData))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);