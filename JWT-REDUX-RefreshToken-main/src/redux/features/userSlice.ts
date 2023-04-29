import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../api/types";

// Define an interface for the User state
interface IUserState {
  user: IUser | null;
}

// Set the initial state for the User state
const initialState: IUserState = {
  user: null,
};

// Create a Redux slice for the user, including its reducers and actions
export const userSlice = createSlice({
  initialState, // The initial state of the slice
  name: "userSlice", // The name of the slice
  reducers: {
    // The logout reducer sets the state back to the initial state
    logout: () => initialState,
    // The setUser reducer sets the user property in the state
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

// Export the userSlice reducer as the default export
export default userSlice.reducer;

// Export the actions (logout and setUser) from the userSlice
export const { logout, setUser } = userSlice.actions;

// This code defines a Redux slice for managing user state using the Redux Toolkit. The createSlice function is used to generate a slice object containing the reducers and actions for handling user-related state changes. The logout and setUser actions are then exported for use in other parts of the application.
