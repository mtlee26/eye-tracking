// src/app/web-browsing/page.tsx
import BrowseComponent from "@/component/web-browsing/WebBrowser"; // <<< SỬA ĐƯỜNG DẪN VÀ TÊN FILE/COMPONENT CHO ĐÚNG
// Bỏ import Layout và VirtualKeyboard nếu không dùng trực tiếp ở đây

export default function WebBrowsingPage() { 
  return (
    <BrowseComponent />
  );
}