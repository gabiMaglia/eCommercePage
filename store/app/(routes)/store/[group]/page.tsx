import getBillboards from "@/actions/get-billboards";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

const fetchGroupData = async (group: string) => {
    const groups = await getBillboards();
    const currentGroup = groups.find(g => g.id === group) || groups[0];
    const productQuery = await getProducts({ isFeatured: true, categoryGroupId: currentGroup.id });
  return { productQuery, currentGroup };
};

const StoreGroupPage = async ({ params }: { params: { group: string } }) => {
  const { group } = params;
  const { productQuery, currentGroup } = await fetchGroupData(group);

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={currentGroup} />
      </div>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <ProductList title="Featured Products" items={productQuery.filteredProducts} />
      </div>
    </Container>
  );
};

export default StoreGroupPage;
