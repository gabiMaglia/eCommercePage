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

        const { name, price, categoryId, brandId, colors, stock, images, generalDescription, characteristics, isFeatured, isArchived } = body

        if (!name) return new NextResponse("Name is required", { status: 400 });
        if (!images || !images.length) return new NextResponse("Images is required", { status: 400 });
        if (!price) return new NextResponse("Price is required", { status: 400 });
        if (!stock) return new NextResponse("Stock is required", { status: 400 });
        if (!categoryId) return new NextResponse("categoryId is required", { status: 400 });
        if (!brandId) return new NextResponse("brandId is required", { status: 400 });

        if (!colors) return new NextResponse("Color is required", { status: 400 });
        if (!params.storeId) return new NextResponse("StoreId is required", { status: 400 });


        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });
        console.log(characteristics)

        const parseCaracteristics = JSON.stringify(characteristics)
        console.log(parseCaracteristics)



        const product = await prismadb.product.create({
            data: {
                name,
                price,
                categoryId,
                brandId,
                stock: {
                    create: {
                        quantity: stock
                    }
                },
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                },
                colors: {
                    create: colors.map((color: { value: string; stock: { toString: () => string; }; }) => ({
                        value: color.value,
                        stock: color.stock.toString()
                    })),
                },
                productDescription: {
                    create: {
                        generalDescription: generalDescription,
                        caracteristics: parseCaracteristics,
                    },
                },
                isFeatured,
                isArchived,

                storeId: params.storeId

            }
        });

        return NextResponse.json(product);

    } catch (error) {
        console.log("PRODUCT_POST", error)
        return new NextResponse("internal Error", { status: 500 })
    }

}


export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { searchParams } = new URL(req.url)
        const categoryId = searchParams.get('categoryId') || undefined
        const brandId = searchParams.get('brandId') || undefined
        const isFeatured = searchParams.get('isFeaturedId') || undefined

        if (!params.storeId) return new NextResponse("StoreId is required", { status: 400 });

        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                brandId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include: {
                images: true,
                category: true,
                brand: true,
                stock: true,
                colors: true,
                productDescription: true
            }
        });

        return NextResponse.json(products);

    } catch (error) {
        console.log("PRODUCT_GET", error)
        return new NextResponse("internal Error", { status: 500 })
    }

}