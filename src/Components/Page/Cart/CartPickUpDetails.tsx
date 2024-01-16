import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiResponse, cartItemModel } from "../../../Interfaces";
import { RootState } from "../../../Storage/Redux/store";
import { inputHelper } from "../../../Helper";
import { MiniLoader } from "../Common";
import { useInitiatePaymentMutation } from "../../../Apis/paymentApi";
import { useNavigate } from "react-router-dom";

export default function CartPickUpDetails() {
  const [loading, setLoading] = useState(false);
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  const userData = useSelector((state: RootState) => state.userAuthStore);

  let grandTotal = 0;
  let totalItems = 0;

  //automatically populated data in the pickup details page
  const initialUserData = {
    name: userData.fullName,
    email: userData.email,
    phoneNumber: "",
    address: "",
  };

  shoppingCartFromStore?.map((cartItem: cartItemModel) => {
    totalItems += cartItem.quantity ?? 0;
    grandTotal += (cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0);
    return null;
  });
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState(initialUserData);
  const [initiatePayment] = useInitiatePaymentMutation();
  //state variable
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    //calls the input Helper with the user input that is in  current state
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };
  //whenever userData is updated, the effect is set
  useEffect(() => {
    setUserInput({
      name: userData.fullName,
      email: userData.email,
      phoneNumber: "",
      address: "",
    });
  }, [userData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { data }: apiResponse = await initiatePayment(userData.id);

    navigate("/payment", {
      state: { apiResult: data?.result, userInput },
    });
  };
  return (
    <div className="border pb-5 pt-3">
      <h1 style={{ fontWeight: "300" }} className="text-center text-success">
        Pickup Details
      </h1>
      <hr />
      <form onSubmit={handleSubmit} className="col-10 mx-auto">
        <div className="form-group mt-3">
          Pickup Name
          <input
            type="text"
            value={userInput.name}
            className="form-control"
            //placeholder="name..."
            name="name"
            onChange={handleUserInput}
            required
          />
        </div>

        <div className="form-group mt-3">
          Pickup Email
          <input
            type="email"
            value={userInput.email}
            className="form-control"
            //placeholder="email..."
            name="email"
            onChange={handleUserInput}
            required
          />
        </div>

        <div className="form-group mt-3">
          Pickup Phone Number
          <input
            type="number"
            value={userInput.phoneNumber}
            className="form-control"
            //placeholder="phone number..."
            name="phoneNumber"
            onChange={handleUserInput}
            required
          />
        </div>

        <div className="form-group mt-3">
          Pickup Address
          <input
            type="address"
            value={userInput.address}
            className="form-control"
            //placeholder="phone number..."
            name="address"
            onChange={handleUserInput}
            required
          />
        </div>

        <div className="form-group mt-3">
          <div className="card p-3" style={{ background: "ghostwhite" }}>
            {/* Getting the total price and no of items  */}
            <h5>Grand Total : ${grandTotal.toFixed(2)}</h5>
            <h5>No of items : {totalItems} </h5>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-lg btn-success form-control mt-3"
          disabled={loading}
        >
          {loading ? <MiniLoader /> : "Place Order!"}
        </button>
      </form>
    </div>
  );
}
