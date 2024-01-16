import React from "react";
import { useParams } from "react-router-dom";
import { useGetMenuItemByIdQuery } from "../Apis/menuItemApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUpdateShoppingCartMutation } from "../Apis/shoppingCartApi";
import { MainLoader } from "../Components/Page/Common";
import { apiResponse, userModel } from "../Interfaces";
import { toastNotify } from "../Helper";
import { useSelector } from "react-redux";
import { RootState } from "../Storage/Redux/store";

function MenuItemDetails() {
  const { menuItemId } = useParams();
  const { data, isLoading } = useGetMenuItemByIdQuery(menuItemId);

  const navigate = useNavigate(); // navigation variable

  const [quantity, setQuantity] = useState(1); //quantity variable with default value 1

  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false); //adding item to shoppingCart

  const [updateShoppingCart] = useUpdateShoppingCartMutation();

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  //Menu Item quantity logic
  const handleQuantity = (counter: number) => {
    let newQuantity = quantity + counter;
    if (newQuantity === 0) {
      newQuantity = 1;
    }
    setQuantity(newQuantity);
    return;
  };

  //Adding to Cart function
  const handleAddToCart = async (menuItemId: number) => {
    if (!userData.id) {
      navigate("/login");
      return;
    }
    setIsAddingToCart(true);

    const response: apiResponse = await updateShoppingCart({
      menuItemId: menuItemId,
      updateQuantityBy: quantity,
      userId: userData.id,
    });

    //add to cart notification
    if (response.data && response.data.isSuccess) {
      toastNotify("Item added to cart successfully!");
    }

    setIsAddingToCart(false);
  };

  return (
    <div className="container pt- pt-md-5">
      {/* displaying menu item data  from conditional rendering*/}
      {!isLoading ? (
        <div className="row">
          <div className="mt-5 col-7">
            <h2 className="text-success pb-2">{data.result?.name}</h2>
            <span>
              <span
                className="badge text-bg-dark pt-2"
                style={{ height: "40px", fontSize: "20px", marginBottom:"8px" }}
              >
                {data.result?.category}
              </span>
            </span>
            <span>
              <span
                className="badge text-bg-light pt-2"
                style={{ height: "40px", fontSize: "20px" }}
              >
                {data.result?.specialTag}
              </span>
            </span>
            <p style={{ fontSize: "20px" }} className="pt-2">
              {data.result?.description}
            </p>
            <span  className="h3">{data.result?.price}</span> &nbsp;&nbsp;&nbsp;
            <span
              className="pb-2 p-3"
              style={{ border: "1px solid #333", borderRadius: "30px" }}
            >
              <i
                onClick={() => {
                  handleQuantity(-1);
                }}
                className="bi bi-dash p-1"
                style={{ fontSize: "25px", cursor: "pointer" }}
              ></i>
              <span className="h3 mt-3 px-3">{quantity}</span>
              <i
                className="bi bi-plus p-1"
                onClick={() => {
                  handleQuantity(+1);
                }}
                style={{ fontSize: "25px", cursor: "pointer" }}
              ></i>
            </span>
            <div className="row pt-4">
              <div className="col-5">
                {/* this id is used for the cart item inside shopping cart */}
                {isAddingToCart ? (
                  <button disabled className="btn btn-success form-control">
                    <MainLoader />
                  </button>
                ) : (
                  <button
                    className="btn btn-success form-control"
                    onClick={() => handleAddToCart(data.result?.id)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>

              <div className="col-5 ">
                <button
                  className="btn btn-secondary form-control"
                  // this code takes you to the last URL we were on
                  onClick={() => navigate(-1)}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
          <div className="col-5">
            <img
              src={data.result?.image}
              style={{ width: "80%", borderRadius: "50%", marginLeft: "30px", marginTop: "20px" }}
              alt="No content"
            />
          </div>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center"
          style={{ width: "100%" }}
        >
          <MainLoader />
        </div>
      )}
    </div>
  );
}

export default MenuItemDetails;
