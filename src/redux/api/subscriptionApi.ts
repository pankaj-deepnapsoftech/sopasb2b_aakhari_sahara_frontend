//@ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9011/api", 
  }),
  endpoints: (builder) => ({
    getAllUserSubscriptions: builder.query({
      query: () => "/subscription/all-users-subscription",
    }),
  }),
});

export const { useGetAllUserSubscriptionsQuery } = subscriptionApi;
