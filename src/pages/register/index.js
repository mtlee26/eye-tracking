import { useEffect } from "react";
import Register from "@/ui/Register";

export const metadata = {
  title: 'Register | Eyetertainment',
};

export default function Home() {
  useEffect(() => {
    document.title = metadata.title;
  }, []);

  return (
    <Register />
  );
}