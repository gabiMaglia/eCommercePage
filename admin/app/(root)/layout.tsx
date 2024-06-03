import prismadb from "@/lib/prismadb";
import { ensureUserExists } from "@/lib/user-utils";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout(
    {children}: {children: React.ReactNode}
) {
    const {userId} = auth();
    if (!userId) redirect('/sign-in');

    const store = await prismadb.store.findFirst({
        where: {
            userId
        }
    })
    if(store) redirect(`/${store.id}`)
     const clerkUserData = await currentUser();
   
    await ensureUserExists(userId, clerkUserData)
    return(
        <>
        {children}
        </>
    )

}