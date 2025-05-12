import Navbar from "@/components/NavBar";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative">
      {/* Gradient background */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-[-2] bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(131,107,210,0.26),rgba(255,255,255,0))]"></div>

      {/* Grid background */}
      {/* <div className="absolute inset-0 z-[-1]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div> */}

      {/* Navbar */}
      <Navbar />

      {children}
    </div>
  );
};

export default MainLayout;
