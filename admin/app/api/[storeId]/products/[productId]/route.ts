import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"


export async function GET(_req: Request, { params }: { params: { productId: string } }) {
    try {
        if (!params.productId) return new NextResponse('productId is required', { status: 400 })

        const product = await prismadb.product.findUnique({
            where: {
                id: params.productId,
            },
            include: {
                images: true,
                category: true,
                brand: true,
                colors: true
            }
        })

        return NextResponse.json(product)
    } catch (error) {
        console.log("PRODUCT_GET", error)
        return new NextResponse("internal Error", { status: 500 })
    }
}

export async function PATCH(req: Request, { params }: { params: { storeId: string, productId: string } }) {
    try {
        const { userId } = auth()
        if (!userId) return new NextResponse("Unautorized", { status: 401 });

        const body = await req.json()

        const { name, price, categoryId, brandId, colors, stock, images, isFeatured, isArchived } = body


        if (!name) return new NextResponse("Name is required", { status: 400 });
        if (!price) return new NextResponse("Price is required", { status: 400 });
        if (!colors) return new NextResponse("Colors is required", { status: 400 });
        if (!stock) return new NextResponse("Stock is required", { status: 400 });
        if (!categoryId) return new NextResponse("categoryId is required", { status: 400 });
        if (!brandId) return new NextResponse("brandId is required", { status: 400 });

        if (!params.productId) return new NextResponse('productId is required', { status: 400 })

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });
        await prismadb.product.update({
            where: {
                id: params.productId,
            },
            data: {
                name,
                price,
                categoryId,
                brandId,
                images: {
                    deleteMany: {}
                },
                colors: {
                    deleteMany: {}
                },
                stock: {
                    update: {
                        quantity: stock,
                    }
                },

                isFeatured,
                isArchived
            }
        })


        const product = await prismadb.product.update({
            where: {
                id: params.productId
            },
            data: {
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
            }
        })
        return NextResponse.json(product)
    } catch (error) {
        console.log("PRODUCT_PATCH", error)
        return new NextResponse("internal Error", { status: 500 })
    }
}


export async function DELETE(_req: Request, { params }: { params: { storeId: string, productId: string } }) {
    try {
        const { userId } = auth()

        if (!userId) return new NextResponse("Unautorized", { status: 401 });

        if (!params.productId) return new NextResponse('productId is required', { status: 400 })
        if (!params.storeId) return new NextResponse('StoreId is required', { status: 400 })

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });

        const product = await prismadb.product.deleteMany({
            where: {
                id: params.productId,

            },
        })

        return NextResponse.json(product)
    } catch (error) {
        console.log("PRODUCT_DELETE", error)
        return new NextResponse("internal Error", { status: 500 })
    }
}