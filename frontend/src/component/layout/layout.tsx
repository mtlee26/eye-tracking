"use client"; // 👉 Bắt buộc nếu Layout dùng client-side logic (ví dụ: animation, interactivity)

import React from "react";
import BgGlassmorphism from "../BgGlassmorphism";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className = "" }: Props) => {
  return (
    <section
      className={`dashboard2 xl:flex-col xl:gap-y-[30px] bg-[rgb(245,246,250)] flex gap-x-6 overflow-hidden relative ${className}`}
    >
      <div className="flex w-full">
        {/* Background Component */}
        <BgGlassmorphism />

        {/* Uncomment if Menu is needed */}
        {/* <Menu className="flex-none" /> */}

        <article className="relative flex flex-col flex-grow gap-y-[117px] min-w-0 mb-[61px] mt-[40px] ml-8 min-h-[1000px]">
          <div className="relative z-10">{children}</div>
        </article>
      </div>
    </section>
  );
};

export default Layout;
