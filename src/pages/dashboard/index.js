// import Carousel from "../../components/Carousel";
import { useEffect } from "react";
import HomePage from "@/ui/Homepage";

export const metadata = {
  title: 'Home | Eyetertainment',
};

export default function Home() {
  useEffect(() => {
    document.title = metadata.title;
  }, []);

  return (
    <HomePage />
  );
}