import PRODUCTS from "../../data/dummy-data";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS,
} from "../actions/products";
import Product from "../../models/product";

const initialState = {
  availiableProducts: [],
  userProducts: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.pid
        ),
        availiableProducts: state.availiableProducts.filter(
          (product) => product.id !== action.pid
        ),
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availiableProducts: state.availiableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );

      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const availiableProductIndex = state.availiableProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedAvailanleProducts = [...state.availiableProducts];
      updatedAvailanleProducts[availiableProductIndex] = updatedProduct;
      return {
        ...state,
        availiableProducts: updatedAvailanleProducts,
        userProducts: updatedUserProducts,
      };
    case SET_PRODUCTS:
      return {
        availiableProducts: action.products,
        userProducts: action.userProducts,
      };
  }
  return state;
};

export default reducer;
