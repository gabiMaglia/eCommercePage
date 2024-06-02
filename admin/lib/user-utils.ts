import prismadb from "@/lib/prismadb";

export const ensureUserExists = async (userId: string, clerkUserData: any) => {
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
    });
  }
};