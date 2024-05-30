import prismadb from "@/lib/prismadb";
import { ProductForm } from "./componenets/product-form";
import { ProductDescription } from "@prisma/client";

const ProductPage = async({
    params
}: {
    params: {productId: string, storeId: string}
}) => {
    const product = await prismadb.product.findUnique({
        where: {
            id: params.productId
        },
        include: {
            images: true,
            // color: true,
            stock: true,
            productDescription:true
        }
    })    

    const categories = await prismadb.category.findMany({
        where: {storeId: params.storeId}
    })
    
    const brand = await prismadb.brand.findMany({
        where: {storeId: params.storeId}
    })
    const color = await prismadb.color.findMany({
        where: {productId: params.productId}
    })
    const stock = await prismadb.stock.findFirst({
        where: {productId: params.productId}
    })
    const description  = await prismadb.productDescription.findFirst({
        where: {productId: params.productId}
    })
   
    const quantity : number | undefined = stock?.quantity

    return (  
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
            <ProductForm 
            categories={categories}
            brand={brand}
            stock={quantity}
            productDescription={description}
            colors={color}
            initialData={product}
            />
            </div>
        </div>
    );
}
 
export default ProductPage;