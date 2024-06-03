import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function DELETE(_req: Request, {params}: {params: {id: string}} ) {
    try {
      const { userId } = auth()
      if (!userId) return new NextResponse("Unautorized", { status: 401 });
      if (!params.id) return new NextResponse('user id is required', {status: 400})
        
      const store = await prismadb.store.deleteMany({
          where: {
              id: params.id,
          },
      })
      return NextResponse.json(store)
    } catch (error) {
      console.log("STORE_DELETE", error)
      return new NextResponse("internal Error", { status: 500 })
    }
  }