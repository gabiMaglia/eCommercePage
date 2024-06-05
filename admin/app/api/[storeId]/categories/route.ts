import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });
        const body = await req.json();
        const { promoImages, name, image, billboardId } = body;
        console.log( promoImages, name, image, billboardId )
        if (!name) return new NextResponse("Name is required", { status: 400 });
        if (!billboardId) return new NextResponse("billboardId is required", { status: 400 });
        if (!params.storeId) return new NextResponse("StoreId is required", { status: 400 });

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        });

        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });

        const category = await prismadb.category.create({
            data: {
                name,
                image,
                billboardId,
                storeId: params.storeId,
                promoImages: {
                    create: promoImages.map((img: { url: string }) => ({
                        url: img.url,
                    })),
                },
            },
            include: {
                promoImages: true,
            },
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log("CATEGORIES_POST", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        if (!params.storeId) return new NextResponse("StoreId is required", { status: 400 });
        const categories = await prismadb.category.findMany({
            where: {
                storeId: params.storeId
            },
            include: {
                promoImages: true,
            }
        });
        return NextResponse.json(categories);

    } catch (error) {
        console.log("CATEGORIES_GET", error)
        return new NextResponse("internal Error", { status: 500 })
    }

}