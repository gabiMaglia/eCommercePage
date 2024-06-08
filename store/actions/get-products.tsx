import qs from 'query-string'
import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`
// TODO PASAR A AXIOS
interface Query {
    categoryGroupId?:string
    categoryId?:string
    brandId?:string
    isFeatured?:boolean
}
const getProducts = async (query: Query): Promise<Product[]> => {
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            categoryGroupId: query.categoryGroupId,
            brandId: query.brandId,
            categoryId: query.categoryId,
            isfeatured: query.isFeatured
        }
    })
    const res = await fetch(`${url}`)
    // console.log(await res.json())
  
    return res.json()

}
export default getProducts;