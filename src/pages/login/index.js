import { useEffect } from "react";
import Login from "@/ui/Login";

export const metadata = {
  title: 'Login | Eyetertainment',
};

export default function Home() {

  useEffect(() => {
    document.title = metadata.title;
  }, []);
  
  return (
    <Login />
  );
}