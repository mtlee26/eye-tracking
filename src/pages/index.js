
import Login from "@/ui/Login";
import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useRouter } from "next/navigation";

export const metadata = {
  title: 'Home | Eyetertainment',
};

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    document.title = metadata.title;
  }, []);

  useEffect(() => {
    router.push('/login');  // redirect to login page
  }, [router]);

  return (
    <div>
      {/* dashboard...or menu */}
    </div>
  );
}