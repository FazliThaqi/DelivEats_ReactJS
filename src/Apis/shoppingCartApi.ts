import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const shoppingCartApi = createApi({
  reducerPath: "shoppingCartApi",
  baseQuery: fetchBaseQuery({
    //defined the endpoint to apend the menu item here
    baseUrl: "https://localhost:7237/api/", //to navigate to the endpoint
    // logic when making API request , we have to send a token back to the request
    prepareHeaders:(headers: Headers , api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer "+ token );     // authorization is the header that has to be set when the API is called
    },
  }),
  tagTypes: ["ShoppingCarts"],
  endpoints: (builder) => ({
   
    getShoppingCart: builder.query({
      query: (userId) => ({
        url: `shoppingCart`,
        params:{  // userId is passed as a parameter in query 
          userId:userId
        }
      }),
      providesTags: ["ShoppingCarts"],
    }),
      updateShoppingCart : builder.mutation({ //mutation for update
        query: ({menuItemId, updateQuantityBy , userId}) => ({
          url :"shoppingcart",
          method:"POST",
          params :{
            menuItemId,
            updateQuantityBy,
            userId,

          },
        }) ,// arrow f. to write what happens after we receive these things in parameter.
        invalidatesTags : ["ShoppingCarts"],
      }),
    }),
  });


export const { useGetShoppingCartQuery ,useUpdateShoppingCartMutation} = shoppingCartApi; // here we append our endpoint
export default shoppingCartApi;
