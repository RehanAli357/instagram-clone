import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface UserAuthState {
  email: string;
  password: string;
  id: string;
  image: string;
}

const initialState: UserAuthState = {
  email: "",
  password: "",
  id: "",
  image: "",
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setUserDetails(state, action: PayloadAction<UserAuthState>) {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.password = action.payload.password;
      state.image = action.payload.image;
    },
  },
});

export const { setUserDetails } = userAuthSlice.actions;
export default userAuthSlice.reducer;
