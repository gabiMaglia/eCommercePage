import { Product } from "@/types";
import Currency from "./ui/currency";

interface infoProps {
    data: Product
}

const Info: React.FC<infoProps> = (
    {data}
) => {
    return ( 
    
        <div className="text-3xl font-bold text-gray-900">
            <h1>{data.name}</h1>
            <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl text-gray-900">
                    <Currency value={data?.price}/>
                </p>
            </div>
            <hr className="my-4"/>
            <div>
                <h3 className="font-semibold text-black">Brand</h3>
                <div>{data?.brand?.name}</div>
            </div>
        </div>
     
    
    );
}
 
export default Info;