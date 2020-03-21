import React, {Component, Fragment} from 'react';
import {Button} from "reactstrap";
import {fetchPosts} from "../../store/actions/postsActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PostListItem from "../../components/PostListItem/PostListItem";

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <Fragment>
        <h2>
          Posts
          {
            this.props.user &&
            <Button
              color="primary"
              className="float-right"
              tag={Link}
              to={"/posts/new"}
            >
              Add post
            </Button>
          }
        </h2>

        {this.props.posts && this.props.posts.map(post => (
          <PostListItem
            key={post._id}
            title={post.title}
            id={post._id}
            datetime={post.datetime}
            image={post.image}
            author={post.author.username}
          />
        ))}

        <div ref={this.bottom}/>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  user: state.users.user
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
