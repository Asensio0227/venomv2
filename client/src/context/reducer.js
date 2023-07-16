import {
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  CHANGE_PASSWORD_BEGIN,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  GET_SINGLE_USER_BEGIN,
  GET_SINGLE_USER_SUCCESS,
  GET_SINGLE_USER_ERROR,
  DELETE_USER_BEGIN, 
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  SHOW_MODAL,
  HIDE_MODAL,
  GET_ALL_VIDEOS_BEGIN,
  GET_ALL_VIDEOS_SUCCESS,
  GET_ALL_VIDEOS_ERROR,
  POST_YOUR_THOUGHTS_BEGIN,
  POST_YOUR_THOUGHTS_SUCCESS,
  POST_YOUR_THOUGHTS_ERROR,
  GET_ALL_SINGLE_VIDEO_COMMENTS_BEGIN,
  GET_ALL_SINGLE_VIDEO_COMMENTS_SUCCESS,
  GET_ALL_SINGLE_VIDEO_COMMENTS_ERROR,
  POST_COMMENT_BEGIN,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_ERROR,
  DELETE_COMMENT_BEGIN,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
} from './actions';

import { initialState } from "./context"

const reducer = (state, action) => {
  if (action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      userLoading: false,
    }
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    }
  }

  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      userLoading: false,
      users: action.payload
    }
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    }
  }
  
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      isSidebarOpen: !state.isSidebarOpen
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      isLoading: false
    };
  }

  if (action.type === GET_CURRENT_USER_BEGIN) {
    return {
      ...state,
      userLoading: true
    }
  }

  if (action.type === GET_CURRENT_USER_SUCCESS) {
    return {
      ...state,
      userLoading: false,
      users: action.payload
    };
  }

  if (action.type === CHANGE_PASSWORD_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }
  if (action.type === CHANGE_PASSWORD_SUCCESS) {
    return {
      ...state,
      isLoading: false
    }
  }
  if (action.type === CHANGE_PASSWORD_ERROR) {
    return {
      ...state,
      isLoading: false
    }
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      users: action.payload
    }
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false
    }
  }
  if (action.type === GET_SINGLE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }
  if (action.type === GET_SINGLE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      numOfVideos: action.payload.count,
      singleUserVideos: action.payload.streams
    }
  }
  if (action.type === GET_SINGLE_USER_ERROR) {
    return {
      ...state,
      isLoading: false
    };
  }
  if (action.type === DELETE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === DELETE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    }
  }
  if (action.type === DELETE_USER_ERROR) {
    return {
      isLoading: false
    }
  }
  if (action.type === SHOW_MODAL) {
    return {
      ...state,
      videoModal: true
    }
  }
  if (action.type === HIDE_MODAL) {
    return {
      ...state,
      videoModal: false
    }
  }
  if (action.type === GET_ALL_VIDEOS_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }
  if (action.type === GET_ALL_VIDEOS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      videos: action.payload
    }
  }
  if (action.type === GET_ALL_VIDEOS_ERROR) {
    return {
      ...state,
      isLoading: false
    }
  }
  if (action.type === POST_YOUR_THOUGHTS_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }
  if (action.type === POST_YOUR_THOUGHTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      videos: [...state.videos, action.payload]
    }
  }
  if (action.type === POST_YOUR_THOUGHTS_ERROR) {
    return {
      ...state,
      isLoading: false
    }
  }
  if (action.type === GET_ALL_SINGLE_VIDEO_COMMENTS_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }
  if (action.type === GET_ALL_SINGLE_VIDEO_COMMENTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      allComments: action.payload
    }
  }
  if (action.type === GET_ALL_SINGLE_VIDEO_COMMENTS_ERROR) {
    return {
      ...state,
      isLoading: false
    }
  }
  if (action.type === POST_COMMENT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === POST_COMMENT_SUCCESS) {
    console.log(action.payload, state.allComments);
    return {
      ...state,
      isLoading: false,
      singleComments: action.payload
    }
  }
  if (action.type === POST_COMMENT_ERROR) {
    return {
      ...state,
      isLoading: false
    }
  }
  if (action.type === DELETE_COMMENT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === DELETE_COMMENT_SUCCESS) {
    return {
      ...state,
      isLoading: false
    }
  }
  if (action.type === DELETE_COMMENT_ERROR) {
    return {
      ...state,
      isLoading: false
    }
  }
  throw new Error(`Please check if ${action.type} exist`);
};

export default reducer;