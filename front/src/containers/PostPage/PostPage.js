import React, {Component} from 'react';
import {fetchPost} from "../../store/actions/postsActions";
import {connect} from "react-redux";
import {apiURL} from "../../constants";
import FormElement from "../../components/UI/Form/FormElement";
import {fetchComments, postComment} from "../../store/actions/commentActions";
import {Badge, Button, Col, Form, FormGroup, Media} from "reactstrap";
import moment from "moment";

class PostPage extends Component {
  state = {
    text: '',
  };
  async componentDidMount() {
    await this.props.fetchPost(this.props.match.params.id);
    await this.props.fetchComments(this.props.match.params.id)
  }
  submitFormHandler = async event => {
    event.preventDefault();

    const comment = {...this.state};
    comment.author = this.props.user._id;
    comment.postID = (this.props.match.params.id);

    await this.props.addComment(comment);
    this.setState({text: ''});
    await this.props.fetchComments(this.props.match.params.id)
  };
  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };
  render() {
    if (!this.props.post) return null;
    return (
      <>
        <h2>{this.props.post.title}</h2>
        {this.props.post.description && this.props.post.description }
        {this.props.post.image &&
        <img src={apiURL + '/uploads/' + this.props.post.image} alt={this.props.post.title}/>}
        <br/>
        <br/>
        <hr/>
        <h3>Comments: </h3>
        { this.props.comments &&

        this.props.comments.map(comment => (
          <>
            <Media>
            <Media body>
              <Badge color="secondary" pill>{moment(comment.datetime).format('HH:MM (MMMM Do YYYY)')} by  {comment.author.username}: </Badge>
              <br/>
              <p>{comment.text}</p>
            </Media>
          </Media>
          <hr/>
          </>


          ))}
        <br/>
        <br/>
        <h4>{this.props.user ? 'Add comment:' : 'Login to add comments'}</h4>
        <br/>
        { this.props.user &&
            <Form onSubmit={this.submitFormHandler}>
              <FormElement
                propertyName='text'
                title='text'
                value={this.state.text}
                onChange={this.inputChangeHandler}
                type='text'
              />
              <FormGroup row>
                <Col sm={{offset: 2, size: 10}}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </FormGroup>
            </Form>
        }
      </>
    );
  }
}

const mapStateToProps = state => ({
  post: state.posts.post,
  user: state.users.user,
  comments: state.comments.comments
});

const mapDispatchToProps = dispatch => ({
  fetchPost: (id) => dispatch(fetchPost(id)),
  fetchComments: (postID) => dispatch(fetchComments(postID)),
  addComment: (comment) => dispatch(postComment(comment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);