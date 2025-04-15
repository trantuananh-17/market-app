import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

export type Product = {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
  price: number;
  images?: string[];
  date: string;
  description: string;
  seller: {
    id: string;
    name: string;
    avatar?: string;
  };
};
const initialState: Product[] = [];

const slice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    updateListings(_, { payload }: PayloadAction<Product[]>) {
      return payload;
    },
    deleteItem(oldListing, { payload }: PayloadAction<string>) {
      return oldListing.filter((item) => item.id !== payload);
    },
  },
});

export const { updateListings, deleteItem } = slice.actions;

export const getListings = createSelector(
  (state: RootState) => state,
  (state) => state.listing
);

export default slice.reducer;
