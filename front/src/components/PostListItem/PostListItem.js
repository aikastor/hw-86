import React from 'react';
import PropTypes from 'prop-types';
import {Badge, Card, CardBody, CardTitle} from "reactstrap";
import PostThumbnail from "../PostThumbnail/PostThumbnail";
import {Link} from "react-router-dom";
import moment from 'moment';

const PostListItem = props => {
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <Badge color="secondary" pill>{moment(props.datetime).format('HH:MM (MMMM Do YYYY)')} by {props.author}</Badge>
        </CardTitle>
        <PostThumbnail image={props.image}/>
        <Link to={"/posts/" + props.id}>
          {props.title}
        </Link>
        <strong style={{marginLeft: '10px'}}>
          {}
        </strong>
      </CardBody>
    </Card>
  );
};

PostListItem.propTypes = {
  image: PropTypes.string,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  datetime: PropTypes.string.isRequired
};

export default PostListItem;