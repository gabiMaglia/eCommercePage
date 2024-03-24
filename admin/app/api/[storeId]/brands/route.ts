import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        if (!userId) return new NextResponse("Unautorized", { status: 401 });

        const { name } = body
       
        if (!name) return new NextResponse("Image is required", { status: 400 });
        if (!params.storeId) return new NextResponse("StoreId is required", { status: 400 });


        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });

        const newBrand = await prismadb.brand.create({
            data: {
                name,
                storeId: params.storeId

            }
        });
        return NextResponse.json(newBrand);

    } catch (error) {
        console.log("BILLBOARD_POST", error)
        return new NextResponse("internal Error", { status: 500 })
    }

}


export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        if (!params.storeId) return new NextResponse("StoreId is required", { status: 400 });

        const brand = await prismadb.brand.findMany({
            where: {
                storeId: params.storeId
            }
        });

        return NextResponse.json(brand);

    } catch (error) {
        console.log("BILLBOARD_GET", error)
        return new NextResponse("internal Error", { status: 500 })
    }

}