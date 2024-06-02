import prismadb from "@/lib/prismadb";

import { NextResponse } from "next/server"

export async function POST(
    req: Request,

) {
    try {
        const body = await req.json()
        const { userId, clerkUserData } = body
        const user = await prismadb.user.create({
            data: {
                clerkId: userId,
                email: clerkUserData?.emailAddresses[0]?.emailAddress || "",
                name: `${clerkUserData?.firstName || ""} ${clerkUserData?.lastName || ""}`,
                phone: "",
                address: {
                    create: {
                        country: "",
                        state: "",
                        address: "",
                        zipCode: "",
                        number: "",
                    },
                },
            },
            include: {
                address: true,
            },
        });
        return NextResponse.json(user)

    } catch (error) {
        console.log("USER_POST", error)
        return new NextResponse("internal Error", { status: 500 })
    }

}