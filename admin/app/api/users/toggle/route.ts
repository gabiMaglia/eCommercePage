import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function PATCH(req: Request ) {
    try {
        const { userToBan } = await req.json()
        const { userId } = auth()

        if (!userId) return new NextResponse("Unautorized", { status: 401 });

        const user = await prismadb.user.findUnique({
            where: { id: userToBan }
        });

        const store = await prismadb.user.update({
            where: {
                id: userToBan,
            },
            data: {
                isBanned: !user?.isBanned
            }
        })
        return NextResponse.json(store)
    } catch (error) {
        console.log("STORE_DELETE", error)
        return new NextResponse("internal Error", { status: 500 })
    }
}