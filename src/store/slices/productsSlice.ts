import { createSlice } from "@reduxjs/toolkit";

export type ProductsTypeStore = {
  id: number,
  image_url: string,
  title: string,
  description: string,
  price: number,
  qty: number
}

const initialState: ProductsTypeStore[] = []

const productsSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {
    addProduct(state, action) {
      const { id, image_url, title, description, price } = action.payload
      const extQty = state.find(prod => prod.id === id)
      if (extQty) {
        extQty.qty += 1
      } else {
        state.push({ id, image_url, title, description, price, qty: 1 })
      }
    },
    updateProduct(state, action) {
      const [ id, quantity ] = action.payload
      state.map(prod => {
        if (prod.id === id){
          return prod.qty = quantity
        } else if (quantity === 0){
           return state.filter(prod => prod.id !== id)
        }
      })
    },
    deleteProduct(state, action) {
      const id = action.payload
      return state.filter(prod => prod.id !== id)
    },
    deleteAllProducts(state) {
      state.length = 0;
    },
  },
})

export const { addProduct, updateProduct, deleteProduct, deleteAllProducts } = productsSlice.actions
export default productsSlice.reducer