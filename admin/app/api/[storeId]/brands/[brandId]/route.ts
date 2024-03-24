import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"


export async function GET(_req: Request, { params }: { params: { brandId: string } }) {
    try {
        if (!params.brandId) return new NextResponse('Brand ID is required', { status: 400 })

        const brand = await prismadb.brand.findUnique({
            where: {
                id: params.brandId,
            },
        })

        return NextResponse.json(brand)
    } catch (error) {
        console.log("BRAND_DELETE", error)
        return new NextResponse("internal Error", { status: 500 })
    }
}

export async function PATCH(req: Request, { params }: { params: { storeId: string, brandId: string } }) {
    try {
        const { userId } = auth();
        if (!userId) return new NextResponse("Unautorized", { status: 401 });

        const body = await req.json()

        const { name } = body
        if (!name) return new NextResponse("Label is required", { status: 400 });
       
        if (!params.brandId) return new NextResponse('Brand is required', { status: 400 })

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });

        const brand = await prismadb.brand.updateMany({
            where: {
                id: params.brandId,
            },
            data: {
                name 
            }
        })
        return NextResponse.json(brand)
    } catch (error) {
        console.log("BRAND_PATCH", error)
        return new NextResponse("internal Error", { status: 500 })
    }
}


export async function DELETE(_req: Request, { params }: { params: { storeId: string, brandId: string } }) {
    try {
        const { userId } = auth()

        if (!userId) return new NextResponse("Unautorized", { status: 401 });

        if (!params.brandId) return new NextResponse('BillboardId is required', { status: 400 })
        if (!params.storeId) return new NextResponse('StoreId is required', { status: 400 })

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });

        const brand = await prismadb.brand.deleteMany({
            where: {
                id: params.brandId,

            },
        })

        return NextResponse.json(brand)
    } catch (error) {
        console.log("BRAND_DELETE", error)
        return new NextResponse("internal Error", { status: 500 })
    }
}