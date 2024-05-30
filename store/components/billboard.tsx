import { Billboard as BillboardType } from "@/types";

interface BillboardProps {
  data: BillboardType;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
 
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden bg-cover">
      <div
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden"
        style={{ backgroundImage: `url(${data?.imageUrl})`, backgroundPosition: 'bottom', backgroundSize: "cover" }}
      >
        <div className="h-full w-full justify-center items-center gap-y-8 ">
        </div>
      </div>
    </div>
  );
};

export default Billboard;
