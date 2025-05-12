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
import NeedBoardComponent from "@/component/needboard/NeedBoard"; // << TÊN EXPORT ĐÚNG LÀ GÌ?
import Layout from "@/component/layout/layout";                   // << ĐƯỜNG DẪN ĐÚNG?

export default function NeedBoardPage() {
  return (
    <Layout>
      <NeedBoardComponent /> {/* << SỬ DỤNG TÊN ĐÃ IMPORT */}
    </Layout>
  );
}