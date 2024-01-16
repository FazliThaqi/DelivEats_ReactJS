import React, { useState } from "react";
import { orderSummaryProps } from "./orderSummaryProps";
import { cartItemModel } from "../../../Interfaces";
import { getStatusColor } from "../../../Helper";
import { useNavigate } from "react-router-dom";
import { SD_Roles, SD_Status } from "../../../Utility/SD";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";
import { useUpdateOrderHeaderMutation } from "../../../Apis/orderApi";
import { MainLoader } from "../Common";

function OrderSummary({ data, userInput }: orderSummaryProps) {
  const badgeTypeColor = getStatusColor(data.status!);

  const navigate = useNavigate();

  const userData = useSelector((state: RootState) => state.userAuthStore);
  console.log(userData.role);
  const [loading, setIsloading] = useState(false);
  const [updateOrderHeader] = useUpdateOrderHeaderMutation();

  // logic for order status button
  const nextStatus: any =
    userData.role === SD_Roles.KITCHEN_MANAGER &&
    data.status! === SD_Status.CONFIRMED
      ? { color: "secondary", value: SD_Status.BEING_COOKED }
      : userData.role === SD_Roles.KITCHEN_MANAGER &&
        data.status! === SD_Status.BEING_COOKED
      ? { color: "info", value: SD_Status.COMPLETED }
      : userData.role === SD_Roles.KITCHEN_MANAGER &&
        data.status! === SD_Status.COMPLETED
      ? { color: "warning", value: SD_Status.READY_FOR_PICKUP }
      : userData.role === SD_Roles.DELIVERY &&
        data.status! === SD_Status.READY_FOR_PICKUP
      ? { color: "light", value: SD_Status.OUT_FOR_DELIVERY }
      : userData.role === SD_Roles.DELIVERY &&
        data.status! === SD_Status.OUT_FOR_DELIVERY && {
          color: "success",
          value: SD_Status.DELIVERED,
        };

  const handleNextStatus = async () => {
    setIsloading(true);
    console.log(data);
    await updateOrderHeader({
      orderHeaderId: data.id,
      status: nextStatus.value,
    });
    setIsloading(false);
  };
  const handleCancel = async () => {
    setIsloading(true);
    await updateOrderHeader({
      orderHeaderId: data.id,
      status: SD_Status.CANCELLED,
    });
    setIsloading(false);
  };
  const role =
    userData.role === SD_Roles.ADMIN ||
    userData.role === SD_Roles.KITCHEN_MANAGER ||
    userData.role === SD_Roles.DELIVERY;
  return (
    <div>
      {loading && <MainLoader />}
      {!loading && (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="text-success">Order Summary</h3>
            <span className={`btn btn-outline-${badgeTypeColor} fs-6`}>
              {data.status}
            </span>
          </div>
          <div className="mt-3">
            {/* getting the user details that has placed order */}
            <div className="border py-3 px-2">Name : {userInput.name} </div>
            <div className="border py-3 px-2">Email : {userInput.email} </div>
            <div className="border py-3 px-2">
              Phone : {userInput.phoneNumber}{" "}
            </div>
            <div className="border py-3 px-2">
              Address : {userInput.address}{" "}
            </div>

            <div className="border py-3 px-2">
              <h4 className="text-success">Menu Items</h4>
              <div className="p-3">
                {/* mapping through the menu item to get the name , price and quantity of orders */}
                {data.cartItems?.map(
                  (cartItem: cartItemModel, index: number) => {
                    return (
                      <div className="d-flex" key={index}>
                        <div className="d-flex w-100 justify-content-between">
                          <p>{cartItem.menuItem?.name}</p>
                          <p>
                            {cartItem.menuItem?.price} x {cartItem.quantity}{" "}
                          </p>
                        </div>
                        <p style={{ width: "70px", textAlign: "right" }}>
                          ${/* multiplying the item's price with quantity*/}
                          {(cartItem.menuItem?.price ?? 0) *
                            (cartItem.quantity ?? 0)}{" "}
                        </p>
                      </div>
                    );
                  }
                )}

                <hr />
                <h4 className="text-danger" style={{ textAlign: "right" }}>
                  ${data.cartTotal?.toFixed(2)}
                </h4>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              Back to Orders
            </button>
            {/*cancel button and the next order status that will be set by admin*/}
            {role && (
              <div className="d-flex">
                {data.status! !== SD_Status.CANCELLED &&
                  data.status! !== SD_Status.COMPLETED && (
                    <button
                      className="btn btn-danger mx-2"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  )}

                <button
                  className={`btn btn-${nextStatus.color}`}
                  onClick={handleNextStatus}
                >
                  {nextStatus.value}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default OrderSummary;
