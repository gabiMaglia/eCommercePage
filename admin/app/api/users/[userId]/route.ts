import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function DELETE(_req: Request, { params }: { params: { userId: string } }) {
    try {
        const { userId } = auth()
        if (!userId) return new NextResponse("Unautorized", { status: 401 });
        if (!params.userId) return new NextResponse('user id is required', { status: 400 })
        const user = await prismadb.user.delete({
            where: {
                id: params.userId,
            },
        })
        await prismadb.store.deleteMany({
            where: {
                userId: user.clerkId,
            },
        })
        return NextResponse.json("User deleted")
    } catch (error) {
        console.log("USER_DELETE", error)
        return new NextResponse("internal Error", { status: 500 })
    }
}