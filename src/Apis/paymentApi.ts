import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    //defined the endpoint to apend the menu item here
    baseUrl: "https://localhost:7237/api/", //to navigate to the endpoint
    // logic when making API request , we have to send a token back to the request
    prepareHeaders:(headers: Headers , api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer "+ token );     // authorization is the header that has to be set when the API is called
    },
  }),

  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
      query: (userId) => ({
        url: "payment",
        method: "POST",
        params: {
          userId: userId,
        },
      }),
    }),
  }),
});

export const { useInitiatePaymentMutation } = paymentApi; // here we apend our endpoint
export default paymentApi;
