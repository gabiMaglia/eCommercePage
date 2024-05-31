import { format } from 'date-fns';
import prismadb from "@/lib/prismadb";
import { UserColumn } from './components/columns';
import { UserClient } from './components/client';

const UserPage = async ({}: {}) => {
  const users = await prismadb.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      address: true,
      orders: true,
    },
  });

  const formattedUser: UserColumn[] = users.map((item) => ({
    id: item.id,
    email: item.email,
    name: item.name,
    phone: item.phone,
    isBanned: item.isBanned,
    createdAt: format(new Date(item.createdAt), 'yyyy-MM-dd HH:mm:ss'),
    clerkId: item.clerkId,
    address: item.address, 
    orders: item.orders,
    updatedAt: format(new Date(item.updatedAt), 'yyyy-MM-dd HH:mm:ss'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserClient data={formattedUser} />
      </div>
    </div>
  );
};

export default UserPage;
