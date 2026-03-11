import { useAuthStore } from "@/store/AuthStore";
import { useEffect } from "react";

export default function AuthProvider({ children }: any) {
  const fetchMe = useAuthStore((state) => state.fetchMe);
  const hello = () => {
    console.log("Hi");
    
  }
  useEffect(() => {
    //fetchMe();
    hello()
  }, []);

  return children;
}