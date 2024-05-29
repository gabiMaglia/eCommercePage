import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods" : "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers" : "Content-Type, Authorization"

};

export async function OPTIONS() {
    return NextResponse.json({}, {headers: corsHeaders})
}

export async function POST(
    req : Request,
    { params } : {params: {storeId: string}},
) {
    const { productIds }  = req.json()
    if (productIds || productIds.length === 0) {
        return new NextResponse("Product ids are required", { status: 400 })
    }

    const products = await prismadb.product.findMany({
        where: {
            id: {
                in: productIds
            }
        }
    });

    const order = prismadb.order.create({
        data: {
            storeId: params.storeId,
            isPaid: false,
            orderItems: {
                create: productIds.map((productId: string) => ({
                    product: {
                        connect: {
                            id: productId
                        }
                    }
                }))
            }
        }
    });

    const session = 
}