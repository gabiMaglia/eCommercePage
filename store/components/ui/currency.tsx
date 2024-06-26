'use client'

import { useEffect, useState } from "react"


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

    const [isMounted, setIsMounted] = useState(false)
    useEffect(()=> {
        setIsMounted(true)
    }, [])

    if(!isMounted) {
        return null
    }
    return ( 
        <span className="font-semibold">
            {formatter.format(Number(value))}
        </span>
     );
}
 
export default Currency;