// components/HeroSection.js
import Image from 'next/image'
import CardWrapper from '@/components/cards'
import MainLayout from '@/components/mainLayout'

export default function HomePage() {
//   return (
//     <div className="h-screen overflow-y-auto">
//         <div className=" flex flex-col p-4 overflow-auto min-h-screen">
//             {/* <div className="justify-center gap-6 rounded-lg bg-[#1a1b20] px-6 py-10 md:px-20 w-full h-full"> */}
//                 <div className="flex-auto flex flex-col md:flex-row md:gap-36 justify-center items-center text-center  p-4">
//                     <div className='flex flex-col items-center justify-center'>
//                         <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#e2e2e9]">Eyetertainer</h1>
//                         <p className="text-lg text-[#adc6ff]">See the fun, feel the joy – Control with your eyes, enjoy with your heart.</p>
//                     </div>
//                     <div className="mb-6">
//                     {/* Logo */}
//                         <Image src="/images/hero-image.png" alt="hero image" width={350} height={350} />
//                     </div>
//                 </div>

//                 <div className="flex-auto p-6 flex items-center justify-center">
                    // <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3 w-full h-full">
                    //     <CardWrapper />
                    // </div>
//                 </div>
//             {/* </div> */}
//         </div>
//     </div>
//   )
  return (
    <MainLayout>
      {/* page content */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold leading-tight">
          Accessible fun for everyone, <br />
          <span className="blue_gradient">inclusively</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mt-4">
          See the fun, feel the joy – Control with your eyes, enjoy with your heart.
        </p>
        <div className="mt-36 flex space-x-4">
          <>
            <CardWrapper />
          </>
        </div>
      </div>
    </MainLayout>
  );
}


