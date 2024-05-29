import { Caracteristics, Product } from "@/types";
import Currency from "./ui/currency";
import { capitalize } from "@/lib/util";

interface infoProps {
  data: Product;
}

const Info: React.FC<infoProps> = ({ data }) => {
    const quantity: Number | undefined = data.stock?.quantity
  return (
    <div className="text-3xl font-bold text-gray-800">
      <h3 className="text-slate-600">{capitalize(data?.brand?.name)}</h3>
      <h1>{capitalize(data?.name)}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-slate-600">
          <Currency value={data?.price} />
        </p>
      </div>

        <div className="flex justify-between py-7">
         <div>   
          <h4>Colors</h4>
          <div className="flex">
            {data.colors?.map((color) => (
              <div
                key={Math.random() + Date.now()}
                className=" border-slate-700 py-2 inline-flex pl-1 pr-1 border-double "
              >
                <div
                  style={{ backgroundColor: color.value }}
                  className="w-5 h-5 rounded-full border-black border-2 cursor-pointer"
                />
              </div>
            ))}
          </div>
          </div>
      <div>
        <h4>Stock</h4>
        <p>{Number(quantity)}</p>
      </div>
        </div>


      <hr className="my-4" />


      <div className="flex flex-col gap-10">
        <p className="text-slate-500 font-normal">
          {capitalize(data.productDescription?.generalDescription)}
        </p>
        {JSON.parse(data.productDescription?.caracteristics).map(
          (e: Caracteristics, index: any) => (
            <div
              className="flex gap-3 flex-wrap text-slate-600 font-normal"
              key={index}
            >
              <h4 className="font-bold">{capitalize(e.title)}</h4>
              <p>{capitalize(e.description)}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Info;
