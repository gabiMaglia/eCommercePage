import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, clerkUserData } = body;

        let user = await prismadb.user.findUnique({
            where: { clerkId: userId },
        });

        if (!user) {
            user = await prismadb.user.create({
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
        }

        return NextResponse.json(user);
    } catch (error) {
        console.log("USER_POST", error);
        return new NextResponse("internal Error", { status: 500 });
    }
}
export async function GET(req: Request) {
    try {
        const user = await prismadb.user.findMany()
        return NextResponse.json(user);
    } catch (error) {
        console.log("USER_GET", error);
        return new NextResponse("internal Error", { status: 500 });
    }
}