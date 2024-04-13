'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { ProductsType } from "@/actions/getProduct";
import { getProducts } from "@/actions/getProduct";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import ButtonGroup from './ButtonGroup';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const NUMBER_PAGE_TO_FETCH = 1
const INITIAL_NUMBER_OF_PRODUCTS = 12


export default function ListProduct({ page, initialProducts }: { page: number, initialProducts: ProductsType[] }) {


    const [offset, setOffset] = useState<number>(page + NUMBER_PAGE_TO_FETCH)
    const [products, setProducts] = useState(initialProducts)

    const { ref, inView } = useInView()

    useEffect(() => {
        if (inView) {
            loadMoreUsers()
        }
    }, [inView])

    const loadMoreUsers = async () => {
        const apiProducts = await getProducts(offset, INITIAL_NUMBER_OF_PRODUCTS)
        setProducts([...products, ...apiProducts.products])
        setOffset(offset + NUMBER_PAGE_TO_FETCH)
    }


    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 lg:gap-4'>
                {products.map((product: ProductsType) => (
                    <Card key={product.id} className="w-full flex flex-col border-4">
                        <CardHeader className='p-6 sm:p-4 flex justify-center items-center'>
                            <Image
                                src={product.image_url}
                                width={280}
                                height={300}
                                alt={product.title}
                                className='h-[320px] rounded-lg hover:scale-105'
                            />
                        </CardHeader>
                        <CardContent className='p-6 sm:p-4'>
                            
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                        <CardTitle className='min-h-[50px] truncate cursor-pointer text-xl lg:text-2xl'>{product.title}</CardTitle>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{product.title}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                            <CardContent className='p-0'>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>Описание</AccordionTrigger>
                                        <AccordionContent>
                                            {product.description}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </CardContent>
                        <CardContent className='p-6 sm:p-4 uppercase text-xl lg:text-2xl text-center mt-auto'>
                            цена: {product.price} ₽
                        </CardContent>
                        <ButtonGroup product={product} />
                    </Card>
                ))
                }
                <button onClick={loadMoreUsers}>Load more</button>
            </div>
            <div ref={ref}>
                Loading...
            </div>
        </>
    )
}