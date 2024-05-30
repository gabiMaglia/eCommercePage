import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
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
  console.log(clerkUserData);
  if (!userId) redirect("/sign-in");

  let user = await prismadb.user.findFirst({
    where: {
      clerkId: userId,
    },
  });

  if (!user) {
    user = await prismadb.user.create({
      data: {
        clerkId: userId,
        email: clerkUserData?.emailAddresses[0]?.emailAddress || "",
        name: `${clerkUserData?.firstName || ""} ${clerkUserData?.lastName || ""}`,
        phone: "",
        // Aquí creamos la dirección asociada al usuario
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
        address: true, // Incluir la dirección creada en la respuesta
      },
    });
    console.log(user)
  }

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
