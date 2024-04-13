'use client'

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { Button } from "./ui/button"
import { deleteProduct } from "@/store/slices/productsSlice"
import { useToast } from "./ui/use-toast"


export default function ContentProductInfo() {

    const { toast } = useToast()

    const dispatch = useAppDispatch()

    const state = useAppSelector(state => state.products)
    const totalPrice = state.reduce((acc, product) => {
        return acc + (product.price * product.qty)
    }, 0)

    const handleDelete = (id: number) => {
        dispatch(deleteProduct(id))
        toast({
            title: "Увы(",
            description: "Ваш товар удалён из корзины."
        })
    }

    return (
        <>
            <div className="uppercase text-base lg:text-xl text-end mb-4">
                вся сумма: {totalPrice} ₽
            </div>
            {state.map(prod => (
                <div key={prod.id} className="flex items-center justify-between p-2 border rounded mb-2">
                    <p>{prod.price} ₽</p>
                    <p>X{prod.qty}</p>
                    <Button onClick={() => handleDelete(prod.id)} variant="destructive" className="text-xs px-2 py-2 h-auto uppercase">удалить</Button>
                </div>
            ))}
        </>
    )

}