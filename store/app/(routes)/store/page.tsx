import { redirect } from "next/navigation";
import getBillboards from "@/actions/get-billboards";
import getProducts from "@/actions/get-products";

const StorePage = async () => {
  const groups = await getBillboards();
  if (groups.length > 0) {
    const firstGroupId = groups[0].id;
    redirect(`/store/${firstGroupId}`);
  } else {
    return null;
  }
};

export default StorePage;
