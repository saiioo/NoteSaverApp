import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // user:null,
  user: localStorage.getItem('user'),
  // token:null,
  token:localStorage.getItem('token'),
  deletedAll:false
}

const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem(
        'user',
        JSON.stringify(action.payload.user)
      );
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
      deleAll : (state) => {
        state.deletedAll = state.deletedAll === true ? false : true
      },
  }
})


export const { setLogin, setLogout, deleAll } =
  authSlice.actions;
export default authSlice.reducer;