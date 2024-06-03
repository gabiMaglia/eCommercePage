import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { ensureUserExists } from "@/lib/user-utils";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();
  const clerkUserData = await currentUser();
  if (!userId) redirect("/sign-in");
  const user = await ensureUserExists(userId, clerkUserData)


  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });
  if (!store) {
    redirect("/");
  }

  return (
    <>
      <div>
        <Navbar />
      </div>
      {children}
    </>
  );
}
