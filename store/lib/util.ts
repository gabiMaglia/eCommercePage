import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


 export const  capitalize = (string:String) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

} 