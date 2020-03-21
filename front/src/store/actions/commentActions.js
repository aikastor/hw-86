import axiosApi from "../../axiosApi";

export const POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';

export const postCommentSuccess = () => ({type: POST_COMMENT_SUCCESS});
export const fetchCommentsSuccess = (comments) => ({type:FETCH_COMMENTS_SUCCESS, comments});

export const postComment = comment => {
  return async (dispatch, getState) => {
    try {
      const user = getState().users.user;
      await axiosApi.post('/comments', comment, {headers: {'Authorization': 'Token ' + user.token}});
      dispatch(postCommentSuccess());
    } catch (e) {
      throw new Error(e)
    }
  }
};

export const fetchComments = postID => {
  return async (dispatch) => {
    try {
      const comments = await axiosApi.get('/comments/'+ postID);
      dispatch(fetchCommentsSuccess(comments.data))
    } catch (error) {
      throw new Error(error)
    }
  }
};