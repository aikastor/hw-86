import axiosApi from "../../axiosApi";

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';

export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';

export const fetchPostsSuccess = posts => ({type: FETCH_POSTS_SUCCESS, posts});
export const createPostSuccess = () => ({type: CREATE_POST_SUCCESS});
export const fetchPostSuccess = post => ({type: FETCH_POST_SUCCESS, post});

export const fetchPosts = () => {
  return async (dispatch) => {
    const response = await axiosApi.get('/posts');
    dispatch(fetchPostsSuccess(response.data));
  };
};

export const createPost = postData => {
  return async (dispatch, getState) => {
    const user = getState().users.user;
    await axiosApi.post('/posts', postData, {headers: {'Authorization': 'Token ' + user.token}});
    dispatch(createPostSuccess());
  };
};

export const fetchPost = id => {
  return async dispatch => {
    const response = await axiosApi.get('/posts/' + id);
    dispatch(fetchPostSuccess(response.data));
  }
};