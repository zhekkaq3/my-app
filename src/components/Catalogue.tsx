import { getProducts } from "@/actions/getProduct";
import FormCustom from "./FormCustom";
import ListProduct from "./ListProduct";


const INITIAL_NUMBER_OF_PRODUCTS = 12


export default async function Catalogue() {
    const initial  = await getProducts(1, INITIAL_NUMBER_OF_PRODUCTS)
    return (
        <div className="flex flex-col w-full items-center justify-center">
            <FormCustom />

            <ListProduct page={initial.page} initialProducts={initial.products}/>
        </div>
    )
}