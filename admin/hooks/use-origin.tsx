import { useState, useEffect } from "react";


export const useOrigin = () => {
  const [origin, setOrigin] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setOrigin(window.location.origin);
  }, []);

  if (!isMounted || typeof window === "undefined") return "";

  return origin;
}