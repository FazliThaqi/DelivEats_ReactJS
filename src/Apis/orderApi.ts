import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    //defined the endpoint to apend the menu item here
    baseUrl: "https://localhost:7237/api/", //to navigate to the endpoint

    // logic when making API request , we have to send a token back to the request
    prepareHeaders:(headers: Headers , api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer "+ token );     // authorization is the header that has to be set when the API is called
    },
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderDetails) => ({
        url: "order",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: orderDetails,
      }),
      invalidatesTags: ["Orders"],
    }),
    getAllOrders: builder.query({
      query: ({userId ,searchString ,status, pageNumber, pageSize}) => ({
        url: "order",
        params: {
         ...(userId && {userId}),
         ...(searchString && {searchString}),
         ...(status && { status }),
         ...(pageSize && {pageSize}),
         ...(pageNumber && {pageNumber}),

        },
      }),
      transformResponse(apiResponse: {result: any}, meta: any){
        return{
          apiResponse,
          totalRecords: meta.response.headers.get("X-Pagination"),
        }
      },
      providesTags: ["Orders"],
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `order/${id}`,
      }),
      providesTags: ["Orders"],
    }),

    updateOrderHeader: builder.mutation({
      query: (orderDetails) => ({
        url: "order/" + orderDetails.orderHeaderId,
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: orderDetails,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderDetailsQuery,
  useUpdateOrderHeaderMutation,
} = orderApi; // here we apend our endpoint
export default orderApi;
