// // src/app/needboard/page.tsx
// import NeedBoardComponent from "@/component/needboard/NeedBoard"; // Đường dẫn tới component
// import Layout from "@/component/layout/layout"; // Sử dụng layout chung

// export default function NeedBoardPage() {
//   return (
//     // Bạn có thể chọn dùng Layout chung hoặc một Layout khác nếu cần
//     <Layout className="bg-gray-100"> 
//       <NeedBoardComponent />
//     </Layout>
//   );
// }
//     </Layout>
// src/app/needboard/page.tsx
// src/app/needboard/page.tsx
import NeedBoard from "@/component/needboard/NeedBoard"; // Đặt tên rõ ràng
import Layout from "@/component/layout/layout";

export default function NeedBoardPage() {
  return (
    <Layout>
      <NeedBoard />
    </Layout>
  );
}