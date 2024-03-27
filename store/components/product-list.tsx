import { Product } from "@/types";
import NoResult from "./ui/no-results";
import ProductCard from "./ui/product-card";

interface ProductListProps {
    title:string;
    items:Product[]
}
const ProductList: React.FC<ProductListProps> = (
    {
        title,
        items
    }
) => {
    return ( 
        <div className="space-y-4"> 
            <h3 className="font-bold text-3xl">{title}</h3>
            {items.length === 0 && <NoResult/> }
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grids-cols-3 lg:grids-cols-4 gap-4 ">
                {items.map((item) => (
                    <div key={item.id}>
                      <ProductCard data={item} />
                       {item.name}
                   </div>
                ))}
            </div>
        </div>
     );
}
 
export default ProductList;