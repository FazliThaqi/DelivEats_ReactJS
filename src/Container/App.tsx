import React ,{useState} from "react";
import { Header, Footer } from "../Components/Layout";
import '@fortawesome/fontawesome-free/css/all.min.css';

import {
  AllOrders,
  AuthenticationTest,
  AuthenticationTestAdmin,
  Home,
  Login,
  MenuItemDetails,
  MenuItemList,
  MenuItemUpsert,
  MyOrders,
  NotFound,
  OrderConfirmed,
  OrderDetails,
  Payment,
  Register,
  ShoppingCart,
} from "../Pages";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartQuery } from "../Apis/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import jwt_decode from "jwt-decode";
import { userModel } from "../Interfaces";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import AccessDenied from "../Pages/AccessDenied";
import { RootState } from "../Storage/Redux/store";


//useEffect hook when retrive when the component is loaded
//useState to store that locally

function App() {
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(true);
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const { data, isLoading } = useGetShoppingCartQuery(userData.id,
    {
    skip: skip,
 }
  );

  //getting data from localStorage so when the app is refreshed , the data doesnt go away
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, id, email, role }: userModel = jwt_decode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      //when shopping cart is updated , it automatically dispatches and sets the new shopping cart
      console.log(data);
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data]);


  useEffect(()=>{
    if(userData.id) setSkip(false);
  }, [userData]);
  
  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/menuItemDetails/:menuItemId"
            element={<MenuItemDetails />}
          ></Route>
          <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/authentication"
            element={<AuthenticationTest />}
          ></Route>
          <Route
            path="/authorization"
            element={<AuthenticationTestAdmin />}
          ></Route>
          <Route path="/accessDenied" element={<AccessDenied />} />
          <Route path="/payment" element={<Payment />} />
          <Route
            path="order/orderconfirmed/:id"
            element={<OrderConfirmed />}
          ></Route>
          <Route path="/order/myOrders" element={<MyOrders />} />
          <Route path="/order/orderDetails/:id" element={<OrderDetails />} />
          <Route path="/order/allOrders" element={<AllOrders />} />

          <Route path="/menuItem/menuitemlist" element={<MenuItemList />} />

          <Route
            path="/menuItem/menuItemUpsert/:id" element={<MenuItemUpsert />}
          />
          <Route path="/menuItem/menuItemUpsert" element={<MenuItemUpsert />} />



          <Route path="*" element={<NotFound />}></Route>

        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;