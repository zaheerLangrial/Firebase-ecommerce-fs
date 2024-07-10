import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart(state, action) {
      if (!!state.find((item) => item.url === action.payload.url)) {
        state.find((item) => {
          if (item.url === action.payload.url) {
            item.quantity++;
          }
        });
      } else {
        state.push(action.payload);
        toast.success("Add to Cart");
      }
    },
    deleteFormCart(state, action) {
      return state.filter((item) => item.id !== action.payload.id);
    },
    incrementQuantity(state, action) {
      state = state.map((item) => {
        if (item.id === action.payload) {
          item.quantity++;
        }
        return item;
      });
    },
    decrementQuantity(state, action) {
      state = state.map((item) => {
        if (item.quantity !== 1) {
          if (item.id === action.payload) {
            item.quantity--;
          }
        }
        return item;
      });
    },
  },
});

export default CartSlice.reducer;

export const {
  addToCart,
  incrementQuantity,
  deleteFormCart,
  decrementQuantity,
} = CartSlice.actions;
