'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { CardContent } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { ProductsType } from '@/actions/getProduct'
import { addProduct, deleteProduct, updateProduct } from '@/store/slices/productsSlice'
import { useToast } from './ui/use-toast'

export default function ButtonGroup({ product }: { product: ProductsType }) {

    const state = useAppSelector(state =>state.products.find(prod=>prod.id === product.id))
    

    const dispatch = useAppDispatch()

    const [buy, setBuy] = useState<boolean>(false)
    const [quantity, setQuantity] = useState<number>(0)

    const { toast } = useToast()
  
    useEffect(()=>{
        dispatch(updateProduct([ product.id, quantity]))
       
    },[quantity,buy])

    useEffect(() => {
        if (!state || quantity == 0){
            setBuy(false)
            setQuantity(0)
        }
    },[quantity,state])

    const buyProd = () => {
        dispatch(addProduct(product))
        setBuy(!buy)
        setQuantity(1)
        toast({
            title: "Спасибо! УРА",
            description: "Ваш товар добавлен."
          })
    }

    const inc = () => {
        setQuantity(prev => prev + 1)
        toast({
            title: `Спасибо!`,
            description: "Вы добавили один товар. ",
          })
    }

    const dec = () => {
        if (quantity === 1 || quantity < 1) {
            setQuantity(0)
            setBuy(!buy)
            dispatch(deleteProduct(product.id))
            toast({
                title: "Увы(",
                description: "Ваш товар удалён."
              })
        } else {
            setQuantity(prev => prev - 1)
            toast({
                title: `Спасибо!`,
                description: "Вы убрали один товар. ",
              })
        }
        
    }

    const change = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setQuantity(Number(e.target.value))
        if (Number(e.target.value) < 0) {
            setQuantity(0)
            setBuy(!buy)
        }
        toast({
            title: `Спасибо!`,
            description: `Вы выбрали ${Number(e.target.value)}.`,
          })
    }

    return (
        <>
            {
                !buy
                    ? (<CardContent className='p-4'>
                        <Button onClick={buyProd} className='w-full uppercase text-[16px] md:text-[20px] lg:text-[24px] h-[30px] md:h-[40px] lg:h-[50px]'>купить</Button>
                    </CardContent>)

                    : (<CardContent className='p-4 flex gap-8 lg:gap-4'>
                        <Button onClick={dec} className=' uppercase text-[16px] md:text-[20px] lg:text-[24px] h-[30px] md:h-[40px] lg:h-[50px]'>-</Button>
                        <Input className='uppercase text-[16px] md:text-[20px] lg:text-[24px] h-[30px] md:h-[40px] lg:h-[50px] grow text-center border-4' onChange={change} type="number" placeholder='' value={state ? state.qty : quantity} />
                        <Button onClick={inc} className=' uppercase text-[16px] md:text-[20px] lg:text-[24px] h-[30px] md:h-[40px] lg:h-[50px]'>+</Button>
                    </CardContent>)
            }
        </>
    )
}