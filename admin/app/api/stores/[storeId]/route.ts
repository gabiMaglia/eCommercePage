import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function PATCH(req: Request, {params}: {params: {storeId: string}} ) {
  try {

    const { userId } = auth()
    const body = await req.json()
    if (!userId) return new NextResponse("Unautorized", { status: 401 });

    const { name, phone, email, country, state, address, number, storeHours, aboutUs, facebook = "", instagram = "", mercadoLibre = "" } = body
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!params.storeId) return new NextResponse('StoreId is required', {status: 400})
    
    const store = await prismadb.store.update({
        where: {
            id: params.storeId,
            userId
        },
        data: {
            name,
            contactData: {
              upsert: {
                create: {
                  phone,
                  email,
                  storeHours,
                  aboutUs,
                  country, state, number,
                  address,
                  facebook,
                  instagram,
                  mercadoLibre
                },
                update: {
                  phone,
                  storeHours,
                  aboutUs,
                  email,
                  country, state, number,
                  address,
                  facebook,
                  instagram,
                  mercadoLibre
                },
              },
            },
          },
          include: {
            contactData: true,
          },
        });
    return NextResponse.json(store)
  } catch (error) {
    console.log("STORE_PATCH", error)
    return new NextResponse("internal Error", { status: 500 })
  }
}


export async function DELETE(_req: Request, {params}: {params: {storeId: string}} ) {
    try {
      const { userId } = auth()
     
      if (!userId) return new NextResponse("Unautorized", { status: 401 });
  
      if (!params.storeId) return new NextResponse('StoreId is required', {status: 400})
  
      const store = await prismadb.store.deleteMany({
          where: {
              id: params.storeId,
              userId
          },
      })
      return NextResponse.json(store)
    } catch (error) {
      console.log("STORE_DELETE", error)
      return new NextResponse("internal Error", { status: 500 })
    }
  }

  export async function GET(
    req: Request, {params}: {params: {storeId: string}} 
) {
    try {
        const { userId } = auth()
        if (!userId) return new NextResponse("Unautorized", { status: 401 });

        const stores = await prismadb.store.findMany({
            where: {
                id : params.storeId
            },
            include: {
              contactData: true,
              brands: true
            }
        });
        return NextResponse.json(stores)

    } catch (error) {
        console.log("STORE_POST", error)
        return new NextResponse("internal Error", { status: 500 })
    }

}