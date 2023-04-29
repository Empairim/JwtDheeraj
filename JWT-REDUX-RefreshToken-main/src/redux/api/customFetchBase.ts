import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { logout } from "../features/userSlice";

// Define the base URL for the API requests
const baseUrl = `${process.env.REACT_APP_BACKEND_SERVER_ENDPOINT}/api/`;

// Create a new Mutex instance to synchronize access to a shared resource
const mutex = new Mutex();

// Define the base query using the Redux Toolkit's fetchBaseQuery function
const baseQuery = fetchBaseQuery({
  baseUrl,
});

// Define a custom fetch function using the base query and Mutex for synchronization
const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Wait for the Mutex to be unlocked before proceeding
  await mutex.waitForUnlock();

  // Execute the base query with the provided arguments
  let result = await baseQuery(args, api, extraOptions);

  // Check if the error message from the response is "You are not logged in"
  if ((result.error?.data as any)?.message === "You are not logged in") {
    // If the Mutex is not locked, acquire it
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // Attempt to refresh the authentication token
        const refreshResult = await baseQuery(
          {
            credentials: "include",
            url: "auth/refresh",
          },
          api,
          extraOptions
        );

        // If the refresh was successful, execute the base query again
        if (refreshResult.data) {
          result = await baseQuery(args, api, extraOptions);
        }
        // If the refresh failed, log out the user and redirect to the login page
        else {
          api.dispatch(logout());
          window.location.href = "/login";
        }
      } finally {
        // Release the Mutex lock
        release();
      }
    } else {
      // If the Mutex is locked, wait for it to be unlocked and execute the base query again
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  // Return the result of the query
  return result;
};

export default customFetchBase;

//   This code defines a custom fetch function called customFetchBase for use with Redux Toolkit Query. It utilizes a Mutex to synchronize access to a shared resource (the authentication token in this case). The custom fetch function checks if the error message returned by the server is "You are not logged in" and attempts to refresh the authentication token if it is. If the refresh is successful, it executes the base query again. If the refresh fails, it logs out the user and redirects them to the login page.
