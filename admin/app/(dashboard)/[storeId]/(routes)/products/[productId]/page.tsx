import prismadb from "@/lib/prismadb";
import { ProductForm } from "./componenets/product-form";

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
            // color: true
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
    return (  
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
            <ProductForm 
            categories={categories}
            brand={brand}
            // color={color}
            initialData={product}
            />
            </div>
        </div>
    );
}
 
export default ProductPage;