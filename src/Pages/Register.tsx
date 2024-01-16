import React, { useState } from "react";
import { SD_Roles } from "../Utility/SD";
import { inputHelper, toastNotify } from "../Helper";
import { useRegisterUserMutation } from "../Apis/authApi";
import { apiResponse, idInputProps } from "../Interfaces";
import { useNavigate } from "react-router-dom";
import { MainLoader } from "../Components/Page/Common";

function Register() {
  const [registerUser] = useRegisterUserMutation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
    role: "",
    name: "",
  });

  const [deliveryId, setDeliveryId] = useState("");
  const [adminId, setAdminId] = useState("");
  const [kitchenManagerId, setKitchenManagerId] = useState("");

  const handleUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/[A-Z]/.test(userInput.password) || !/\d/.test(userInput.password)) {
      toastNotify(
        "Password must contain an uppercase letter and a number.",
        "error"
      );
      return;
    }

    setLoading(true);

    let idIsValid = false;

    switch (userInput.role) {
      case SD_Roles.CUSTOMER:
        idIsValid = true;
        break;
      case SD_Roles.DELIVERY:
        idIsValid = deliveryId === "DEL333";
        break;
      case SD_Roles.ADMIN:
        idIsValid = adminId === "ADM555";
        break;
      case SD_Roles.KITCHEN_MANAGER:
        idIsValid = kitchenManagerId === "KIT777";
        break;
      default:
        idIsValid = false;
    }

    if (!idIsValid) {
      toastNotify("Invalid ID", "error");
      setLoading(false);
      return;
    }

    const response: apiResponse = await registerUser({
      userName: userInput.userName,
      password: userInput.password,
      role: userInput.role,
      name: userInput.name,
    });

    console.log(response);

    if (response.data) {
      toastNotify("Registration successful!");
      navigate("/");
    } else if (response.error) {
      toastNotify(response.error.data.errorMessages[0], "error");
    }

    setLoading(false);
  };

  return (
    <div className="container text-center">
      {loading && <MainLoader />}

      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Register</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="name"
              value={userInput.name}
              onChange={handleUserInput}
            />
          </div>

          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              required
              name="userName"
              value={userInput.userName}
              onChange={handleUserInput}
            />
          </div>

          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              required
              name="password"
              value={userInput.password}
              onChange={handleUserInput}
            />
          </div>

          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <select
              className="form-control form-select"
              required
              value={userInput.role}
              name="role"
              onChange={handleUserInput}
            >
              <option value="">--Select Role--</option>
              <option value={SD_Roles.CUSTOMER}>Customer</option>
              <option value={SD_Roles.ADMIN}>Admin</option>
              <option value={SD_Roles.KITCHEN_MANAGER}>Kitchen Manager</option>
              <option value={SD_Roles.DELIVERY}>Delivery</option>
            </select>
          </div>
        </div>

        {userInput.role && userInput.role !== SD_Roles.CUSTOMER && (
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <IdInput
              role={userInput.role}
              IdValue={
                userInput.role === SD_Roles.DELIVERY
                  ? deliveryId
                  : userInput.role === SD_Roles.ADMIN
                  ? adminId
                  : kitchenManagerId
              }
              setIdValue={
                userInput.role === SD_Roles.DELIVERY
                  ? setDeliveryId
                  : userInput.role === SD_Roles.ADMIN
                  ? setAdminId
                  : setKitchenManagerId
              }
            />
          </div>
        )}

        <div className="mt-5">
          <button type="submit" className="btn btn-success" disabled={loading}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

const IdInput: React.FC<idInputProps> = ({ role, IdValue, setIdValue }) => {
  const placeholder = `Enter ${role} ID`;

  return (
    <div>
      <input
        type="password"
        className="form-control"
        placeholder={placeholder}
        required
        name="roleId"
        value={IdValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setIdValue(e.target.value)
        }
      />
    </div>
  );
};

export default Register;
