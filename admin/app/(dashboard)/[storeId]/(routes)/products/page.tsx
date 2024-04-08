import {format} from 'date-fns'

import prismadb from "@/lib/prismadb";
import { formatter } from '@/lib/utils';
import { ProductColumn } from './components/columns';
import { ProductClient } from './components/client';

const ProductsPage = async ({
    params
}: {params: {storeId: string}}) => {
    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            category: true,
            brand: true,
            stock: true,
            colors: true,
            
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedProducts: ProductColumn[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatter.format(item.price.toNumber()),
        quantity: Number(item.stock?.quantity),
        category: item.category.name,
        brand: item.brand.name,
        color: item.colors.map(e => e.value ),
        createdAt: format(item.createdAt, "MMMM do, yyyy")   
    }))
  
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data={formattedProducts} />
            </div>
        </div>
     );
}
 
export default ProductsPage;