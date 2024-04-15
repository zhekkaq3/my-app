"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import ContentProductInfo from "./ContentProductInfo"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { deleteAllProducts } from "@/store/slices/productsSlice"
import { useState } from "react"
import { fetchOrderData } from "@/actions/action"


const phoneRegex = new RegExp(/^7/);
const FormSchema = z.object({
    phone: z.string().regex(phoneRegex, 'Первая цифра должна быть 7! Длинна 11!').min(11, {
        message: "Неполный номер! Должно быть 11 цифр!"
    }).max(11, {
        message: "Длинный номер! Должно быть 11 цифр!"
    }),
});

type CartItem = {
    id: number;
    quantity: number;
}

type Tel = {
    phone: string;
}

export default function FormCustom() {

    const dispatch = useAppDispatch()

    const [view, setView] = useState(false)

    const state = useAppSelector(state => state.products)

    const statePost = useAppSelector(state => state.post)

    const isLoading = useAppSelector((state) => state.post.isLoading);


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            phone: "",

        },
    })

    function onSubmit(tel: z.infer<typeof FormSchema>) {
        // const { phone  } = tel
        // console.log(phone)
        dispatch(fetchOrderData({
            phone : tel,
            cart: state.map(item => ({
                "id": item.id,
                "quantity": item.qty
            }))
        }))
        form.reset()
        dispatch(deleteAllProducts())
        setView(true)
    }

    return (
        <>
            <Card className="w-[100%] md:w-[85%] lg:w-[70%] flex flex-col mb-[40px] border-4">
                <CardHeader>
                    <CardTitle>Добавленные товары</CardTitle>
                </CardHeader>
                <CardContent>
                    <ContentProductInfo />
                </CardContent>
                <CardContent>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex justify-between gap-12">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem className="grow">
                                        <FormLabel className="text-xs lg:text-base">Телефон</FormLabel>
                                        <FormControl>
                                            <Input type="tel" placeholder="+7 (___) ___ __-__" {...field} className="tracking-wider py-1 px-1 sm:px-2 md:px-3 w-full sm:w-[195px] md:w-[195px] text-[12px] sm:text-[16px] md:text-[20px] lg:text-[24px] h-[30px] md:h-[40px] lg:h-[50px]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="uppercase text-[16px] md:text-[20px] lg:text-[24px] h-[30px] md:h-[40px] lg:h-[50px]">заказать</Button>
                        </form>
                    </Form>

                </CardContent>
            </Card>
            <AlertDialog open={view}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Ваш запрос отправлен и обработан!</AlertDialogTitle>
                        {isLoading
                            ? <div>is Loading!!!</div>
                            : <>
                                <AlertDialogDescription>
                                success: {statePost.data.success}
                                </AlertDialogDescription>                    
                                <AlertDialogDescription>
                                {statePost.data.error}
                                </AlertDialogDescription>
                            </>
                        }
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button onClick={() => setView(false)}>Закрыть</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}