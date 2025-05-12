// src/app/page.tsx
import HomePageComponent from "@/component/homepage/homepage"; // Đường dẫn đến component HomePage của bạn

export default function Home() {
  return (
    <HomePageComponent />
  );
}

// src/app/page.tsx
// export default function Home() {
//   return (
//     <div style={{ backgroundColor: 'red', color: 'white', padding: '50px', fontSize: '30px', textAlign: 'center' }}>
//       TEST TRANG CHỦ MỚI - NẾU BẠN THẤY DÒNG NÀY, FILE NÀY ĐÃ ĐƯỢC LOAD!
//     </div>
//   );
// }