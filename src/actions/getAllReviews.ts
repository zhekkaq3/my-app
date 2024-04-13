type getAllReviewsTypes = {
    id: number,
    text: string
}

export async function getAllReviews () : Promise<getAllReviewsTypes[]> {
    try {
        const url = `http://o-complex.com:1337/reviews`
        const response = await fetch(url)
        const data = (await response.json()) as getAllReviewsTypes[]
        return data
      } catch (error: unknown) {
        console.log(error)
        throw new Error(`An error happened: ${error}`)
      }
}