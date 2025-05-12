"use client"; // Bắt buộc nếu bạn dùng `useRouter` trong App Router
import Link from "next/link";
import Layout from "../layout/layout"; // Sửa lại theo đúng path của bạn
import { useRouter } from "next/navigation";
// Định nghĩa các chức năng
const features = [
  {
    name: "Lướt Web",
    icon: "🌐", // Hoặc đường dẫn tới file ảnh: "/assets/icons/web.svg"
    path: "/web-browsing",
    bgColor: "bg-blue-500", // Tailwind class
    textColor: "text-white",
  },
  {
    name: "Bảng Nhu Cầu",
    icon: "📋",
    path: "/needboard",
    bgColor: "bg-green-500",
    textColor: "text-white",
  },
  {
    name: "Đọc Truyện",
    icon: "📖",
    path: "/story-reading",
    bgColor: "bg-yellow-500",
    textColor: "text-black",
  },
  {
    name: "Cài Đặt",
    icon: "⚙️",
    path: "/settings",
    bgColor: "bg-gray-600",
    textColor: "text-white",
  },
];

interface IProps {
  className?: string;
}
function HomePage({ className }: IProps) {
  const router = useRouter();

  // Các hàm handle cũ có thể giữ lại nếu bạn vẫn muốn banner đó
  const handleHowToUseClick = () => {
    router.push("/how-to-use"); // Giả sử bạn có trang này
  };

  return (
    <Layout className={className}>
      <article className="xl:w-full xl:min-w-[unset] xl:m-0 xs:gap-y-10 tn:gap-y-[30px] w-full flex flex-col items-center gap-y-[50px] min-w-0 max-w-[1156px] mb-[61px] mx-auto p-4">
        {/* Hero Banner (Có thể giữ lại hoặc bỏ đi tùy ý) */}
        <section
          className="flex flex-col bg-[image:var(--src)] bg-center bg-cover bg-no-repeat bg-white rounded-lg w-full z-[1] overflow-hidden"
          style={
            {
              "--src": `url(${"/assets/e707ad33aa6fd129f7f9bd3299ccd688.png"})`,
            } as React.CSSProperties
          }
        >
          <div className="xs:mt-10 xs:mr-0 xs:mb-10 xs:ml-[6.66%] tn:mt-[30px] tn:mr-0 tn:mb-[30px] tn:ml-[6.66%] w-[408px] flex flex-col gap-y-[20px] max-w-[85%] mt-[80px] mb-[70px] ml-[6.66%]">
            <h1 className="md:text-[34px] xxs:text-[30px] font-black text-[37px] leading-[1.29] font-NunitoSans text-white z-[1]">
              Công cụ giao tiếp đa năng
            </h1>
            <button
              className="bg-[rgb(84,169,206)] rounded-lg w-fit px-6 py-3 flex justify-center items-center gap-x-3 max-w-full cursor-pointer hover:bg-opacity-80 transition-colors"
              onClick={handleHowToUseClick}
            >
              <p className="font-semibold text-[18px] leading-[1.27] font-PlusJakartaSans text-white capitalize">
                Hướng dẫn sử dụng
              </p>
              <img
                className="w-6"
                src={"/assets/9a492b13b04238b64597d6cd1d66e897.png"}
                alt="icon"
              />
            </button>
          </div>
        </section>

        {/* 4 Icon Chức Năng Mới */}
        <section className="w-full max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-700">
            Chọn một chức năng
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature) => (
              <Link href={feature.path} key={feature.name} legacyBehavior>
                <a
                  className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 cursor-pointer ${feature.bgColor} ${feature.textColor}`}
                >
                  <span className="text-5xl md:text-6xl mb-3">
                    {feature.icon}
                  </span>
                  <p className="font-semibold text-center text-lg">
                    {feature.name}
                  </p>
                </a>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </Layout>
  );
}

export default HomePage;

// function HomePage() {
//   const router = useRouter();

//   const handleTranslateClick = () => {
//     router.push("/translate");
//   };

//   const handleDictionaryClick = () => {
//     router.push("/dictionary");
//   };

//   const handleAboutusClick = () => {
//     router.push("/about-us");
//   };

//   const handleHowToUseClick = () => {
//     router.push("/how-to-use");
//   };

//   const handleGameClick = () => {
//     router.push("/game");
//   };

//   return (
//     <Layout>
//       <article className="xl:w-full xl:min-w-[unset] xl:m-0 xs:gap-y-20 tn:gap-y-[50px] w-[1156px] flex flex-col items-center gap-y-[50px] min-w-0 max-w-[1156px] mb-[61px] mx-auto">
//         {/* Hero Banner */}
//         <section
//           className="flex flex-col bg-[image:var(--src)] bg-[center_center] bg-[length:cover] bg-no-repeat bg-white rounded-lg w-full z-[1] overflow-hidden"
//           style={
//             {
//               "--src": `url(${"/assets/e707ad33aa6fd129f7f9bd3299ccd688.png"})`,
//             } as React.CSSProperties
//           }
//         >
//           <div className="xs:mt-20 xs:mr-0 xs:mb-20 xs:ml-[6.66%] tn:mt-[50px] tn:mr-0 tn:mb-[50px] tn:ml-[6.66%] w-[408px] flex flex-col gap-y-[31px] max-w-[85%] mt-[121px] mb-[107px] ml-[6.66%]">
//             <h2 className="md:text-[34px] xxs:text-[30px] font-black text-[37px] leading-[1.29] font-NunitoSans text-white z-[1]">
//               Sign language communication tool
//             </h2>

//             <button
//               className="bg-[rgb(84,169,206)] rounded-lg w-[184px] pt-[16.5px] pr-6 pb-[16.5px] pl-6 flex justify-center items-center gap-x-3 max-w-full cursor-pointer"
//               onClick={handleHowToUseClick}
//             >
//               <p className="font-semibold text-[18px] leading-[1.27] font-PlusJakartaSans text-white capitalize min-w-0 mt-px">
//                 How to use
//               </p>
//               <img
//                 className="w-6 min-w-0"
//                 src={"/assets/9a492b13b04238b64597d6cd1d66e897.png"}
//                 alt="alt text"
//               />
//             </button>
//           </div>
//         </section>

//         {/* Feature Cards */}
//         <section className="md:gap-x-4 sm:grid-cols-1 grid grid-cols-2 content-start gap-y-[40px] gap-x-[80px] w-[85%]">
//           {/* Dictionary */}
//           <article
//             className="flex flex-col relative cursor-pointer"
//             onClick={handleDictionaryClick}
//           >
//             <div className="bg-[rgb(30,30,47)] rounded-[10px] relative min-h-[150px]">
//               <img
//                 className="w-[180px] absolute right-[-30px] top-1/2 translate-y-[-50%]"
//                 src="https://cdn1.iconfinder.com/data/icons/male-characters-2-1/1000/character_builder___library_man_carry_book_notebook-256.png"
//                 alt="Dictionary"
//               />
//             </div>
//             <button className="md:text-[28px] text-[30px] font-PlusJakartaSans text-white absolute left-[15px] top-[10px]">
//               Dictionary
//             </button>
//           </article>

//           {/* Translator */}
//           <div
//             className="flex flex-col bg-[rgba(244,222,10,0.729)] rounded-[10px] relative cursor-pointer"
//             onClick={handleTranslateClick}
//           >
//             <button className="md:text-[28px] text-[30px] font-PlusJakartaSans text-black absolute left-[15px] top-[10px]">
//               Translator
//             </button>
//             <img
//               className="w-[180px] absolute right-[-30px] top-1/2 translate-y-[-50%]"
//               src="https://cdn0.iconfinder.com/data/icons/akura-travel-illustration/512/Translate-256.png"
//               alt="Translator"
//             />
//           </div>

//           {/* Games */}
//           <div
//             className="flex flex-col relative cursor-pointer"
//             onClick={handleGameClick}
//           >
//             <div className="bg-[rgb(84,169,206)] rounded-[10px] relative min-h-[150px]" />
//             <h2 className="md:text-[28px] text-[30px] font-PlusJakartaSans text-white absolute left-[15px] top-[10px]">
//               Games
//             </h2>
//             <img
//               className="w-[180px] absolute right-[-30px] top-1/2 translate-y-[-50%]"
//               src="/assets/327fb7c90ade98ac584799bb547c9734.png"
//               alt="Games"
//             />
//           </div>

//           {/* About us */}
//           <div
//             className="flex flex-col relative cursor-pointer"
//             onClick={handleAboutusClick}
//           >
//             <div className="bg-[rgba(75,75,89,0.607)] rounded-[10px] relative min-h-[150px]" />
//             <button className="md:text-[28px] text-[30px] font-PlusJakartaSans text-white absolute left-[15px] top-[10px]">
//               About us
//             </button>
//             <img
//               className="w-[180px] absolute right-[-30px] top-1/2 translate-y-[-50%]"
//               src="https://cdn0.iconfinder.com/data/icons/business-profile-1/1000/2205Profile-BusinessProfile-256.png"
//               alt="About us"
//             />
//           </div>
//         </section>
//       </article>
//     </Layout>
//   );
// }

// export default HomePage;
