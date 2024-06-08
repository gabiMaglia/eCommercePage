// 'use client'

import getBillboards from "@/actions/get-billboards"
import  getBillboardbyId from "@/actions/get-billboardById"
import getProducts from "@/actions/get-products"
import Billboard from "@/components/billboard"
import ProductList from "@/components/product-list"
import Container from "@/components/ui/container"




const HomePage =  async() => {
    const products = await getProducts({isFeatured:true});
    const billboards = await getBillboards()
    const firstBill = billboards[0]
    const billboard = await getBillboardbyId(firstBill.id)

    return(
        <Container>
            <div className="space-y-10 pb-10">
                <Billboard data={billboard}/>
            </div>
            
            <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                <ProductList title="Featured Products" products={products} >
                    
                </ProductList>
            </div>
        </Container>
    )
}

export default HomePage