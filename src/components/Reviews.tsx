import { getAllReviews } from "@/actions/getAllReviews"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import parse from 'html-react-parser';



export default async function Reviews() {

    const allReviews = await getAllReviews()

  
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[30px] gap-y-2 w-full mb-[50px]">
            {allReviews.map((review, index) => (
                    <Card key={review.id} className="w-full flex flex-col border-4">
                        <CardHeader>
                            <CardTitle>Отзыв {index + 1}</CardTitle>
                            <CardDescription>Полученный с api HTML</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {parse(review.text)}
                        </CardContent>
                        <CardFooter className="mt-auto">
                            <p>Card Footer</p>
                        </CardFooter>
                    </Card>
            )
            )}
        </div>
    )
}