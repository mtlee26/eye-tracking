"use client";
import { useEffect } from "react";
import Protected from "@/ui/Protected";

export const metadata = {
    title: 'Protected | Eyetertainment',
  };

export default function Home() {
    useEffect(() => {
        document.title = metadata.title;
      }, []);

    return (
        <Protected />
    );
}
