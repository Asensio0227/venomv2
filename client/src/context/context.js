import { createContext,useContext ,useReducer,useEffect } from "react"
import axios from 'axios';
import { toast } from "react-toastify"
import reducer from "./reducer";

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

const defaultURL = axios.create({
  headers: {
    Accept: 'application/json'
  },
  baseURL: `/api/v1`,
});

export const AppContext = createContext();

export const initialState = {
  userId: '',
  users: null,
  userLoading:false,
  isLoading: false,
  isSidebarOpen:false,
  singleUserVideos: [],
  videos:[],
  numOfVideos: 0,
  videoModal: false,
  page: 1,
  limit: 10,
  allComments: [],
  singleComments: [],
};

export function AppProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const registerUsers = async (currentUser) => {
    dispatch({
      type: REGISTER_USER_BEGIN,
    })
    try {
      const { data } = await axios.post(
        `/api/v1/auth/register`
        , currentUser,
        {
        headers: {
    Accept: 'application/json'
  }
      }
      )
      dispatch({
        type: REGISTER_USER_SUCCESS,
      });
      toast.success(data.msg)
    } catch (error) {
      if (error.response.status === 500) {
        toast.error(error.response.data.msg)
        return;
      } 
      dispatch({ type: REGISTER_USER_ERROR });
      toast.error(error.response.data.msg)
    }
  };

  const setupUsers = async ({ currentUser, alertText }) => {
    dispatch({
      type: SETUP_USER_BEGIN,
    })
    try {
      const { data } = await defaultURL.post(`/auth/login`, currentUser)
      toast.success(alertText)
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload:data.user
      });
      console.log(data)
      toast.success(data.msg)
    } catch (error) {
      if (error.response.status === 500) {
        toast.error(error.response.data.msg)
        return;
      } 
      dispatch({ type: SETUP_USER_ERROR });
    }
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  const logoutUser = async () => {
    try {
      await axios.delete('/api/v1/auth/logout');
      dispatch({ type: LOGOUT_USER })
    } catch (error) {
      if (error.response.status === 500) {
        toast.error(error.response.data.msg)
        return;
      }
      console.log(error.msg);
    }
  };
  // change password
  const changePassword = async ({ oldPassword, newPassword }) => {
    dispatch({ type: CHANGE_PASSWORD_BEGIN })
    try {
      const { data } = await defaultURL.patch('/user/updatePassword', { oldPassword, newPassword });
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS
      })
      toast.success(data.msg)
      logoutUser()
    } catch (error) {
      if (error.response.status === 500) {
        toast.error(error.response.data.msg)
        return;
      }
      dispatch({ type: CHANGE_PASSWORD_ERROR })
    }
  };
  // update profile
  const updateUserProfile = async ({ currentUser }) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await defaultURL.patch('/user/updateUser', currentUser);
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: data
      })
      toast.success(`Successfully updated profile`);
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR
        });
        toast.error(error.response.data.msg)
      }
    };
  };

    // current user
    const showCurrentUser = async () => {
      dispatch({ type: GET_CURRENT_USER_BEGIN })
      try {
        const { data } = await defaultURL.get('/user/showCurrentUser');
        dispatch({
          type: GET_CURRENT_USER_SUCCESS,
          payload: data
        });
      } catch (error) {
        if (error.response.status === 500) {
          toast.error(error.response.data.msg)
          return;
        }
      }
    };

    // delete user
    const deleteUser = async (id) => {
      dispatch({ type: DELETE_USER_BEGIN })
      try {
        await defaultURL.delete(`/user/${id}`)
        dispatch({ type: DELETE_USER_SUCCESS })
      } catch (error) {
        if (error.response.status === 500) {
          toast.error(error.response.data.msg)
          return;
        }
        dispatch({ type: DELETE_USER_ERROR })
      }
    };

    // getSingleUser
    const getSingleUserVideos = async (id) => {
      dispatch({ type: GET_SINGLE_USER_BEGIN })
      try {
        const { data } = await defaultURL.get(`/user/${id}/singleVideos`);
        const { streams, count } = data;
        dispatch({
          type: GET_SINGLE_USER_SUCCESS,
          payload: { streams, count }
        })
      } catch (error) {
        if (error.response.status === 500) {
          toast.error(error.response.data.msg)
          return;
        }
        dispatch({ type: GET_SINGLE_USER_ERROR })
      }
    };

    // modal
    const showModal = () => {
      dispatch({ type: SHOW_MODAL })
    }
    const hideModal = () => {
      dispatch({ type: HIDE_MODAL })
    };

    // all videos
    const getAllVideos = async () => {
      dispatch({ type: GET_ALL_VIDEOS_BEGIN });
      try {
        const { data } = await defaultURL.get(`/streams`);
        const { videos } = data;
        dispatch({
          type: GET_ALL_VIDEOS_SUCCESS,
          payload: videos
        });
      } catch (error) {
        if (error.response.status === 500) {
          toast.error(error.response.data.msg)
          return;
        }
        dispatch({ type: GET_ALL_VIDEOS_ERROR })
      }
    };

    // whats going on
    const postYourThoughts = async (opinion) => {
      dispatch({ type: POST_YOUR_THOUGHTS_BEGIN })
      try {
        const { data } = await defaultURL.post('/streams', opinion);
        dispatch({
          type: POST_YOUR_THOUGHTS_SUCCESS,
          payload: data.video
        })
      } catch (error) {
        if (error.response.status === 500) {
          toast.error(error.response.data.msg)
          return;
        }
        dispatch({ type: POST_YOUR_THOUGHTS_ERROR })
      }
    };

    // comments
    const getAllCommentsForSingleStream = async (id) => {
      dispatch({ type: GET_ALL_SINGLE_VIDEO_COMMENTS_BEGIN })
      try {
        const { data } = await defaultURL.get(`/streams/${id}/singleComment`)
        const { comments } = data;
        dispatch({
          type: GET_ALL_SINGLE_VIDEO_COMMENTS_SUCCESS,
          payload: comments
        });
      } catch (error) {
        if (error.response.status === 500) {
          toast.error(error.response.data.msg)
          return;
        }
        dispatch({ type: GET_ALL_SINGLE_VIDEO_COMMENTS_ERROR })
      }
    };

    // post comments
    const createComment = async (tossie) => {
      dispatch({ type: POST_COMMENT_BEGIN })
      try {
        const { data } = await defaultURL.post(`/comments`, tossie);
        const { comment } = data;
        dispatch({
          type: POST_COMMENT_SUCCESS,
          payload: comment
        });
      } catch (error) {
        if (error.response.status === 500) {
          toast.error(error.response.data.msg)
          return;
        }
        dispatch({ type: POST_COMMENT_ERROR })
      }
    };

    // delete comment
    const removeComment = async (id) => {
      dispatch({ type: DELETE_COMMENT_BEGIN })
      try {
        const { data } = await defaultURL.delete(`/comments/${id}`);
        dispatch({
          type: DELETE_COMMENT_SUCCESS
        });
        toast.success(data.msg)
        setTimeout(() => {
          window.location.reload();
        }, 2000)
      } catch (error) {
        if (error.response.status === 500) {
          toast.error(error.response.data.msg)
          return;
        }
        dispatch({ type: DELETE_COMMENT_ERROR })
      }
    };

    useEffect(() => {
      showCurrentUser();
      // eslint-disable-next-line
    }, [])

    return (
      <AppContext.Provider value={{
        ...state,
        registerUsers,
        setupUsers,
        toggleSidebar,
        logoutUser,
        showCurrentUser,
        changePassword,
        updateUserProfile,
        getSingleUserVideos,
        deleteUser,
        showModal,
        hideModal,
        getAllVideos,
        postYourThoughts,
        getAllCommentsForSingleStream,
        createComment,
        removeComment
      }}>
        {children}
      </AppContext.Provider>
    )
};
  
export const useGlobalContext = () => {
  return useContext(AppContext)
};