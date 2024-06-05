import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { Color, Product, Stock } from "@prisma/client";
type ProductWithRelations = Product & {
    colors: Color[];
    stock: Stock | null;
};
export async function PATCH(req: Request, params: { params :{productId: string} }) {
    try {
        const body = await req.json();
        const { amount, color } = body;
        const productId  = params.params.productId
        
        const product: ProductWithRelations | null = await prismadb.product.findUnique({
            where: { id: productId },
            include: {
                colors: true,
                stock: true
            }
        });
        if (!product) {
            return new NextResponse("Selected product doesn't exist", { status: 500 });
        }
        const colorToUpdate = product.colors.find(c => c.value === color);
        if (!colorToUpdate) {
            return new NextResponse("Color not found for the selected product", { status: 404 });
        }
        if (product.stock === null) {
            return new NextResponse("Stock information not available for the selected product", { status: 500 });
        }
        const newStock = colorToUpdate.stock - amount
        const newTotalStock = product.stock.quantity - amount
        
        if (newStock < 0) return new NextResponse("Selected product doesn't have enough stock", { status: 500 });
        
        await prismadb.color.update({
            where: { id: colorToUpdate.id },
            data: {
                stock: newStock,
            },
        });
        await prismadb.stock.updateMany({
            where: { productId: productId },
            data: {
                quantity: newTotalStock,
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.log("USER_POST", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}