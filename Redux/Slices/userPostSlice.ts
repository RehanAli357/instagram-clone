import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserPostState {
  posts: any[];
}

const initialState: UserPostState = {
  posts: [],
};

const userPostSlice = createSlice({
  name: "userPost",
  initialState,
  reducers: {
    setUserPosts(state, action: PayloadAction<{ posts: any[] }>) {
      state.posts = action.payload.posts;
    },
  },
});

export const { setUserPosts } = userPostSlice.actions;
export default userPostSlice.reducer;
