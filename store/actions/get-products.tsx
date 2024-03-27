import qs from 'query-string'

import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`

interface Query {
    categoryId?:string
    brandId?:string
    isFeatured?:boolean
}
const getProduct = async (query: Query): Promise<Product[]> => {
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            brandId: query.brandId,
            categoryId: query.categoryId,
            isfeatured: query.isFeatured
        }
    })
    const res = await fetch(`${url}`)
  
    return res.json()

}
export default getProduct;