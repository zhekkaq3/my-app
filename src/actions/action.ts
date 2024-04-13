import { createAsyncThunk } from '@reduxjs/toolkit';
import { postData } from './post';


type TypePhone = {
    phone: string
}
type CartType = {
    id: number,
    quantity:number   
}

export const fetchOrderData = createAsyncThunk(
  'post/postData',
  async ({ phone, cart }:{phone:TypePhone, cart: CartType[] }) => {
    try {
      const response = await postData(phone, cart);
      console.log(response)

      return response;
    } catch (error) {
      throw error;
    }
  }
);