import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '@models/IProduct';
import { productState } from '@models/IProductState';
import { filters } from 'constants/filters';

const initialState: productState = {
  products: [],
  loading: false,
  error: null,
  filterBy: filters.ALL,
};

const endpoint: string = (process.env.REACT_APP_SOME_ENDPOINT as string);
const key: string = (process.env.REACT_APP_KEY as string);
const userId:string= (process.env.REACT_APP_URI as string);
// const token:string= (process.env.REACT_APP_TOKEN as string);

export const fetchProducts = createAsyncThunk< IProduct[], undefined, { rejectValue: string }
>('products/fetchProduct', async function (_, { rejectWithValue }) {
  const response = await fetch(
    `${endpoint}users/${userId}/bookshelves/2/volumes?key=${key}`,
  );

  if (!response.ok) {
    return rejectWithValue('Server Error!');
  }
  const data = await response.json();
  return data.items;
});

// export const deleteProduct = createAsyncThunk< string, string, { rejectValue: string }
// >('products/deleteProduct', async function (id, { rejectWithValue }) {
//   const response = await fetch(
//     `${endpoint}/mylibrary/bookshelves/2/removeVolume?volumeId=${id}&key={key}`,
//     {
//       method: 'POST',
//       headers: {
//         "Authorization":`Bearer ${token}`,
//         "Content-Type": "application/json",
//         "Accept": "application/json",
//       },   
//     },
//   );
//   if (!response.ok) {
//     return rejectWithValue("Can't delete task. Server error.");
//   }
//   return id;
// });

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productFilter: (state, action) => {
      state.filterBy = action.payload;
    },
    productRemove: (state, action) => {
      state.products = state.products.filter(
        (product: IProduct) => product.id !== action.payload,
      );
    },
    productLike: (state, action) => {
      const item = state.products.find(
        (item: IProduct) => item.id === action.payload,
      );

      if (item) {
        item.liked = !item.liked;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      // .addCase(productRemove.fulfilled, (state, action) => {
      //   state.products = state.products.filter(
      //     (product) => product.id !== action.payload,
      //   );
      // })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});
export const { productFilter, productLike, productRemove } = productSlice.actions;
export default productSlice.reducer;
function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
