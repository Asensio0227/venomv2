import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./features/users/usersSlice";
import videoSlice from "./features/allVideos.js/videoSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    video:videoSlice
  }
})

