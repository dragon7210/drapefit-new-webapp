import { GET_BLOG, GET_BLOG_CATEGORY, GET_BLOG_TAG } from 'actions/common/types';

const initialState = {
  blogCategory: [],
  blog: [],
  blogTag: []
};

const blogReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_BLOG_CATEGORY:
      return {
        ...state,
        blogCategory: payload
      };
    case GET_BLOG:
      return {
        ...state,
        blog: payload
      };
    case GET_BLOG_TAG:
      return {
        ...state,
        blogTag: payload
      };
    default:
      return state;
  }
};

export default blogReducer;
