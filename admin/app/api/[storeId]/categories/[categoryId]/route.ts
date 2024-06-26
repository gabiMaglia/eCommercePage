import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"


export async function GET(_req: Request, { params }: { params: { categoryId: string } }) {
    try {
        if (!params.categoryId) return new NextResponse('Category Id is required', { status: 400 })

        const category = await prismadb.category.findUnique({
            where: {
                id: params.categoryId,
            },
            include: {
                promoImages: true
            }
        })

        return NextResponse.json(category)
    } catch (error) {
        console.log("CATEGORY_GET", error)
        return new NextResponse("internal Error", { status: 500 })
    }
}

export async function PATCH(req: Request, { params }: { params: { storeId: string, image: string, categoryId: string } }) {
    try {
        const { userId } = auth()
        if (!userId) return new NextResponse("Unautorized", { status: 401 });

        const body = await req.json()

        const { name, image, billboardId } = body

        if (!name) return new NextResponse("Name is required", { status: 400 });
        if (!billboardId) return new NextResponse("billboardId is required", { status: 400 });
        if (!params.categoryId) return new NextResponse('categoryId is required', { status: 400 });

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });

        const category = await prismadb.category.updateMany({
            where: {
                id: params.categoryId,
            },
            data: {
                name,
                billboardId,
                image
            }
        })
        return NextResponse.json(category)
    } catch (error) {
        console.log("CATEGORY_PATCH", error)
        return new NextResponse("internal Error", { status: 500 })
    }
}


export async function DELETE(_req: Request, { params }: { params: { storeId: string, categoryId: string } }) {
    try {
        const { userId } = auth()

        if (!userId) return new NextResponse("Unautorized", { status: 401 });

        if (!params.categoryId) return new NextResponse('categoryId is required', { status: 400 });


        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });

        const categories = await prismadb.category.deleteMany({
            where: {
                id: params.categoryId,
            },
        })

        return NextResponse.json(categories)
    } catch (error) {
        console.log("CATEGORY_DELETE", error)
        return new NextResponse("internal Error", { status: 500 })
    }
}