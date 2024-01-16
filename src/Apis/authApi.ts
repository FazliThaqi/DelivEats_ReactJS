import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7237/api/", //to navigate to the endpoint
  }),
  
  endpoints: (builder) => ({
   
    
      registerUser : builder.mutation({ 
        query: (userData) => ({ //userData = object
          url :"auth/register",
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: userData,


        }) ,
      }),

      loginUser : builder.mutation({ 
        query: (userCredentials) => ({ 
          url :"auth/login",
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: userCredentials,


        }) ,
      }),
    }),
  });


export const { useRegisterUserMutation ,  useLoginUserMutation} = authApi; // here we append our endpoint
export default authApi;
