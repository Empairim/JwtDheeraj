import { createApi } from "@reduxjs/toolkit/dist/query";
import customFetchBase from "./customFetchBase";
import { IUser } from "./types";


export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: customFetchBase,
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getMe: builder.query<IUser, null>({
            query() {
                return {
                    url: "users/me",
                    credentials: "include"
                };
            },
            transformResponse: (result: { data: { user: IUser } }) => result.data.user,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                } catch (error) {

                }
            }
        }),
    }),
});