const formatter = new Intl.NumberFormat("en-US", {
    style: 'currency',
    currency: "USD"
  })


  interface CurrentyProps {
    value?: string | number
  }

const Currency: React.FC<CurrentyProps> = (
    {value}
) => {
    return ( 
        <div className="font-semibold">
            {formatter.format(Number(value))}
        </div>
     );
}
 
export default Currency;