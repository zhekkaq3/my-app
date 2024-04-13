import { object } from "zod"

export type DataProductsTypes = {
   page: number,
  amount: number,
  total: number,
  products: ProductsType[]
}

export type ProductsType = {
    id: number,
    image_url: string,
    title: string,
    description: string,
    price: number
}


export async function getProducts (page : number, limit: number): Promise<DataProductsTypes> {
    try {
        const url = `http://o-complex.com:1337/products?page=${page}&page_size=${limit}`
        const response = await fetch(url)
        const data = (await response.json())
        return data
      } catch (error: unknown) {
        console.log(error)
        throw new Error(`An error happened: ${error}`)
      }
}