import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers } from "../services/_DATA";

export const getUsers = createAsyncThunk("users/load", async () => {
  const response = await _getUsers();
  return response;
});

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    status: "idle",
    authedUser: null,
    users: [],
  },
  reducers: {
    login: (state, action) => {
      const id = action.payload.id;
      state.authedUser = state.users.filter((user) => user.id === id)[0];
    },
    logout: (state) => {
      state.authedUser = null;
    },
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.status = "loading";
    },
    [getUsers.fulfilled]: (state, action) => {
      const newUsers = [];
      for (const { id, name, avatarURL } of Object.values(action.payload)) {
        newUsers.push({ id, name, avatarURL });
      }
      state.users = newUsers;
      state.status = "succeeded";
    }
    // TODO: Handle rejection (cannot occur in the mocked API)
  },
});

export const { login, logout } = usersSlice.actions;

export const selectLoadingStatus = (state) => state.users.status;
export const selectAuthedUser = (state) => state.users.authedUser;
export const selectUsers = (state) => state.users.users;

export default usersSlice.reducer;
