import React from "react";
import {
  useDeleteMenuItemMutation,
  useGetMenuItemsQuery,
} from "../../Apis/menuItemApi";
import { MainLoader } from "../../Components/Page/Common";
import { menuItemModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function MenuItemList() {
  const [deleteMenuItem] = useDeleteMenuItemMutation();
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const navigate = useNavigate();

  //Delete menu item method method
  const handleMenuItemDelete = async (id: number) => {
    toast.promise(deleteMenuItem(id), {
      pending: "Processing your request...",
      success: "Menu Item Deleted Successfully 👌",
      error: "Error encountered 🤯",
    },
    {
      theme:"dark",
    }
    );
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">Menu Item List</h1>
            <button
              className="btn btn-success"
              onClick={() => navigate("/menuitem/menuitemupsert")}
            >
              Add New Menu Item
            </button>
          </div>
          <div className="p-2">
            <div className="row border text-center">
              <div className="col-2" style={styles.column}>
                Image
              </div>
              <div className="col-1" style={styles.column}>
                ID
              </div>
              <div className="col-2" style={styles.column}>
                Name
              </div>
              <div className="col-2" style={styles.column}>
                Category
              </div>
              <div className="col-1" style={styles.column}>
                Price
              </div>
              <div className="col-2" style={styles.column}>
                Special Tag
              </div>
              <div className="col-2" style={styles.column}>
                Action
              </div>
            </div>
            {data.result.map((menuItem: menuItemModel) => {
              return (
                <div className="row border text-center" key={menuItem.id}>
                  <div className="col-2" style={styles.column}>
                    <img
                      src={menuItem.image}
                      alt="no content"
                      style={{ width: "100%", maxWidth: "120px" }}
                      className="rounded"
                    />
                  </div>
                  <div className="col-1" style={styles.column2}>
                    {menuItem.id}
                  </div>
                  <div className="col-2" style={styles.column2}>
                    {menuItem.name}
                  </div>
                  <div className="col-2" style={styles.column2}>
                    {menuItem.category}
                  </div>
                  <div className="col-1" style={styles.column2}>
                    {menuItem.price}
                  </div>
                  <div className="col-2" style={styles.column2}>
                    {menuItem.specialTag}
                  </div>
                  <div className="col-2" style={styles.column2}>
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/menuitem/menuitemupsert/" + menuItem.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleMenuItemDelete(menuItem.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  column: {
    fontWeight: "bold",
    color: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  column2: {
    color: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
export default MenuItemList;
