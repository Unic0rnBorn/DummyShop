import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    //dispatch provided to ReduxThunk automaticly
    //so here u can use any async code u need
    try {
      const resp = await fetch(
        `https://shop-app-f2727.firebaseio.com/orders/${userId}.json`
      );

      if (!resp.ok) {
        throw new Error("Something went wrong");
      }

      const respData = await resp.json();

      const loadedOrders = [];
      for (const key in respData) {
        loadedOrders.push(
          new Order(
            key,
            respData[key].cartItems,
            respData[key].totalAmount,
            new Date(respData[key].date)
          )
        );
      }
      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();

    const resp = await fetch(
      `https://shop-app-f2727.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!resp.ok) {
      throw new Error("Something went wrong.");
    }

    const resData = await resp.json();
    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
