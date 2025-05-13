"use client";

import { useState, useRef, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, RotateCcw, ArrowBigLeft, ArrowBigRight, Home, Youtube } from "lucide-react";
import GazeButton from "../gazeButton"; // 

const YOUTUBE_URL = "https://www.youtube.com";
const GOOGLE_SEARCH_URL = "https://www.google.com/search?igu=1";

export default function Browse() {
  const router = useRouter();
  const [url, setUrl] = useState<string>(YOUTUBE_URL);
  const [iframeSrc, setIframeSrc] = useState<string>(YOUTUBE_URL);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  const handleLoadUrl = (e?: FormEvent | React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    let finalUrl = url.trim();

    if (!finalUrl) {
        finalUrl = YOUTUBE_URL;
    } else if (!finalUrl.match(/^https?:\/\//i) && finalUrl.includes('.')) {
        finalUrl = "https://" + finalUrl;
    } else if (!finalUrl.match(/^https?:\/\//i)) {
        finalUrl = `${GOOGLE_SEARCH_URL}&q=${encodeURIComponent(finalUrl)}`;
    }

    setIframeSrc(finalUrl);
    setUrl(finalUrl); // Cập nhật cả url input để đồng bộ
    urlInputRef.current?.blur(); // Bỏ focus khỏi input
  };

  const handleIframeNavigation = (action: "back" | "forward" | "reload" | "home" | "youtube") => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;

    try {
      switch (action) {
        case "back": iframe.contentWindow.history.back(); break;
        case "forward": iframe.contentWindow.history.forward(); break;
        case "reload": iframe.contentWindow.location.reload(); break;
        case "home":
          setUrl(YOUTUBE_URL);
          setIframeSrc(YOUTUBE_URL);
          break;
        case "youtube": 
            setUrl(YOUTUBE_URL);
            setIframeSrc(YOUTUBE_URL);
            break;
      }
    } catch (error) {
      console.warn("Could not control iframe navigation due to cross-origin policy:", error);
      if (action === "reload") setIframeSrc(currentSrc => `${currentSrc.split('?t=')[0]}?t=${Date.now()}`);
      if (action === "home" || action === "youtube") {
        setUrl(YOUTUBE_URL);
        setIframeSrc(YOUTUBE_URL);
      }
    }
  };

  const handleIframeLoad = () => {
    try {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        const currentIframeUrl = iframeRef.current.contentWindow.location.href;
        if (currentIframeUrl && currentIframeUrl !== "about:blank" && !currentIframeUrl.startsWith("https://www.google.com/blank.html")) {
           if (currentIframeUrl !== url) {
               setUrl(currentIframeUrl);
           }
        }
      }
    } catch (error) {
      // console.warn("Cannot read iframe location due to cross-origin policy.");
    }
  };

  const handleGoBackToAppHome = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-800 text-white overflow-hidden">
      <header className="p-3 bg-gray-700 shadow-md flex items-center gap-2 flex-shrink-0 z-20">
        <GazeButton onClick={handleGoBackToAppHome} className="p-2.5 bg-blue-600 hover:bg-blue-700 rounded-md" title="Về Trang chính">
            <ArrowLeft size={20} />
        </GazeButton>

        <GazeButton onClick={() => handleIframeNavigation("back")} className="p-2.5 bg-gray-600 hover:bg-gray-500 rounded-md" title="Lùi"> <ArrowBigLeft size={20} /> </GazeButton>
        <GazeButton onClick={() => handleIframeNavigation("forward")} className="p-2.5 bg-gray-600 hover:bg-gray-500 rounded-md" title="Tới"> <ArrowBigRight size={20} /> </GazeButton>
        <GazeButton onClick={() => handleIframeNavigation("reload")} className="p-2.5 bg-gray-600 hover:bg-gray-500 rounded-md" title="Tải lại"> <RotateCcw size={20} /> </GazeButton>
        <GazeButton onClick={() => handleIframeNavigation("home")} className="p-2.5 bg-gray-600 hover:bg-gray-500 rounded-md" title="Trang chủ trình duyệt (YouTube)"> <Home size={20} /> </GazeButton>
        {/* <GazeButton onClick={() => handleIframeNavigation("youtube")} className="p-2.5 bg-red-600 hover:bg-red-500 rounded-md" title="Mở YouTube"> <Youtube size={20} /> </GazeButton> */}

        <form onSubmit={handleLoadUrl} className="flex-grow flex items-center mx-2">
          <input
            ref={urlInputRef}
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)} // Cho phép nhập từ bàn phím thật
            onKeyDown={(e) => { // Xử lý nhấn Enter trên bàn phím thật
                if (e.key === 'Enter') {
                    handleLoadUrl(e as any);
                }
            }}
            placeholder="Nhập URL hoặc tìm kiếm..."
            className="w-full p-2.5 bg-gray-800 border border-gray-600 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
            spellCheck="false"
          />
          <GazeButton
            onClick={handleLoadUrl}
            className="p-2.5 bg-green-600 hover:bg-green-700 rounded-r-md text-white font-semibold"
          >
            Đi
          </GazeButton>
        </form>
        {/* Nút bật/tắt bàn phím ảo đã được loại bỏ */}
      </header>

      <div className="flex-grow relative bg-black">
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          className="w-full h-full border-none"
          title="Web Browser Content"
          sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
          onError={(e) => console.error("Iframe loading error:", e)}
          onLoad={handleIframeLoad}
        ></iframe>
      </div>

      {/* Phần hiển thị VirtualKeyboard đã được loại bỏ */}
    </div>
  );
}