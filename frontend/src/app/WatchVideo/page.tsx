
// "use client"

// import { useState, useEffect } from "react";
// import axios from "axios"; 
// import { Search } from "lucide-react";
// import { motion } from "framer-motion";

// interface YouTubeVideo {
//   id: { videoId: string };
//   snippet: {
//     title: string;
//     thumbnails: { medium: { url: string } };
//     channelTitle: string;
//   };
// }

// interface YouTubeAPIResponse {
//   items: YouTubeVideo[];
// }

// interface VideoLessonType {
//   id: string;
//   title: string;
//   thumbnail: string;
//   channel: string;
//   duration: string;
// }

// export default function VideoLearning() {
//   const [activeTab, setActiveTab] = useState("video-lessons");
//   const [videoLessons, setVideoLessons] = useState<VideoLessonType[]>([]);
//   const [recentVideos, setRecentVideos] = useState<VideoLessonType[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchInput, setSearchInput] = useState("");
//   const [suggestions, setSuggestions] = useState<string[]>([]);
//   const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
//   const [showKeyboard, setShowKeyboard] = useState(false);

//   const useDebounce = (value: string, delay: number) => {
//     const [debouncedValue, setDebouncedValue] = useState(value);
//     useEffect(() => {
//       const handler = setTimeout(() => setDebouncedValue(value), delay);
//       return () => clearTimeout(handler);
//     }, [value, delay]);
//     return debouncedValue;
//   };

//   const debouncedInput = useDebounce(searchInput, 300);
//   const API_KEY = "AIzaSyBupMzKAKSpfYHjp_6MkxTcnG2oj0IhpDc";

//   // Load recent videos from localStorage on mount
//   useEffect(() => {
//     const storedVideos = localStorage.getItem('recentVideos');
//     if (storedVideos) {
//       setRecentVideos(JSON.parse(storedVideos));
//     }
//   }, []);

//   const fetchVideos = async (query: string) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
//         params: {
//           part: "snippet",
//           maxResults: 10,
//           q: query,
//           key: API_KEY,
//           type: "video",
//         },
//       });

//       const data = response.data as YouTubeAPIResponse;
//       const recentVideoIds = new Set(recentVideos.map(video => video.id));
//       const videos = data.items
//         .filter(item => !recentVideoIds.has(item.id.videoId)) // Exclude videos in recentVideos
//         .map((item) => ({
//           id: item.id.videoId,
//           title: item.snippet.title,
//           thumbnail: item.snippet.thumbnails.medium.url,
//           channel: item.snippet.channelTitle,
//           duration: "10:00",
//         }));

//       setVideoLessons(videos);
//     } catch (error) {
//       console.error("Lỗi khi lấy video từ YouTube:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchInput.trim() === "") return;

//     setSearchQuery(searchInput);
//     fetchVideos(searchInput);
//   };

//   const handleVideoClick = (lesson: VideoLessonType) => {
//     setSelectedVideoId(lesson.id);
    
//     // Update recent videos
//     const updatedRecent = [
//       lesson,
//       ...recentVideos.filter(v => v.id !== lesson.id)
//     ].slice(0, 10); // Keep only last 10 videos
    
//     setRecentVideos(updatedRecent);
//     localStorage.setItem('recentVideos', JSON.stringify(updatedRecent));
//   };

//   const closeModal = () => {
//     setSelectedVideoId(null);
//   };

//   const selectKey = (char: string) => {
//     setSearchInput((prev) => prev + char);
//   };

//   const deleteKey = () => {
//     setSearchInput((prev) => prev.slice(0, -1));
//   };

//   const closeKeyboard = () => {
//     setShowKeyboard(false);
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100 p-6">
//       <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
//         <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
//           LET WATCH YOUTUBE
//         </h1>

//         <form onSubmit={handleSearch} className="mb-6 space-y-4">
//           <label htmlFor="search" className="sr-only">Search Videos</label>
//           <div className="flex items-center bg-gray-200 rounded-lg p-4 space-x-4">
//             <input
//               id="search"
//               type="text"
//               value={searchInput}
//               onClick={() => setShowKeyboard(true)}
//               onChange={(e) => setSearchInput(e.target.value)}
//               placeholder="Search for videos..."
//               className="flex-1 text-lg bg-transparent outline-none px-4 py-3 hover:scale-105 hover:bg-gray-300 transition-transform duration-300"
//               style={{ fontSize: "1.25rem" }}
//             />
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 hover:scale-110 text-white px-6 py-3 rounded-lg text-lg transition-transform duration-300"
//             >
//               <Search size={24} />
//             </button>
//           </div>

//           {showKeyboard && (
//             <div className="fixed bottom-10 left-0 right-0 bg-gray-800 p-4 rounded-lg shadow-lg grid grid-cols-10 gap-2">
//               {"abcdefghijklmnopqrstuvwxyz ".split("").map((char, index) => (
//                 <button
//                   key={`key-${index}`}
//                   className="p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500 hover:scale-105 transition-transform duration-300"
//                   onClick={() => selectKey(char)}
//                 >
//                   {char === " " ? "Space" : char}
//                 </button>
//               ))}
//               <button
//                 key="delete"
//                 className="p-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 hover:scale-105 transition-transform duration-300"
//                 onClick={deleteKey}
//               >
//                 Xóa
//               </button>
//               <button
//                 key="close"
//                 className="p-4 bg-red-600 text-white rounded-lg hover:bg-red-500 hover:scale-105 transition-transform duration-300"
//                 onClick={closeKeyboard}
//               >
//                 Đóng
//               </button>
//             </div>
//           )}

//           {suggestions.length > 0 && (
//             <ul className="bg-white border rounded mt-2 shadow text-lg max-h-64 overflow-auto">
//               {suggestions.map((s, index) => (
//                 <li
//                   key={`suggestion-${index}`}
//                   onClick={() => {
//                     setSearchInput(s);
//                     setSearchQuery(s);
//                     fetchVideos(s);
//                   }}
//                   className="cursor-pointer px-6 py-4 hover:bg-blue-100 hover:scale-105 transition-transform duration-300"
//                 >
//                   {s}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </form>

//         {activeTab === "video-lessons" && (
//           <div>
//             {videoLessons.length > 0 && searchQuery && (
//               <div className="mb-6">
//                 <h2 className="text-2xl font-semibold text-gray-700 mb-4">Search Results</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                   {loading ? (
//                     <div className="text-center text-gray-600 text-xl col-span-full">Đang tải video...</div>
//                   ) : (
//                     videoLessons.map((lesson) => (
//                       <div
//                         key={lesson.id}
//                         className="bg-gray-200 rounded-lg shadow-md cursor-pointer hover:scale-105 hover:bg-gray-300 transition-all duration-300"
//                         onClick={() => handleVideoClick(lesson)}
//                       >
//                         <img
//                           src={lesson.thumbnail}
//                           alt={lesson.title}
//                           className="w-full h-48 object-cover rounded-t-lg"
//                         />
//                         <div className="p-4">
//                           <h3 className="text-xl font-semibold text-blue-700">{lesson.title}</h3>
//                           <p className="text-sm text-gray-600">{lesson.channel}</p>
//                           <p className="text-sm text-gray-500">{lesson.duration}</p>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             )}

//             {recentVideos.length > 0 && (
//               <div className="mb-6">
//                 <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recently Watched</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                   {recentVideos.map((lesson) => (
//                     <div
//                       key={lesson.id}
//                       className="bg-gray-200 rounded-lg shadow-md cursor-pointer hover:scale-105 hover:bg-gray-300 transition-all duration-300"
//                       onClick={() => handleVideoClick(lesson)}
//                     >
//                       <img
//                         src={lesson.thumbnail}
//                         alt={lesson.title}
//                         className="w-full h-48 object-cover rounded-t-lg"
//                       />
//                       <div className="p-4">
//                         <h3 className="text-xl font-semibold text-blue-700">{lesson.title}</h3>
//                         <p className="text-sm text-gray-600">{lesson.channel}</p>
//                         <p className="text-sm text-gray-500">{lesson.duration}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {selectedVideoId && (
//           <motion.div
//             className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="bg-transparent p-0 rounded-none shadow-none w-full max-w-6xl">
//               <button
//                 onClick={closeModal}
//                 className="absolute top-4 right-4 text-gray-600 hover:text-white transition-colors"
//                 style={{ fontSize: "3rem", padding: "1rem 1.5rem" }}
//               >
//                 ×
//               </button>
//               <iframe
//                 className="w-full h-[70vh] sm:h-[80vh] object-cover rounded-lg"
//                 src={`https://www.youtube.com/embed/${selectedVideoId}`}
//                 title="Video"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               />
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }
 // src/app/WatchVideo/page.tsx
"use client"

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
import GazeButton from "@/component/gazeButton";
import VideoLessonCard from "@/component/VideoLesson"; // Đảm bảo đường dẫn đúng

// --- Định nghĩa Interfaces cho YouTube API Response ---
interface YouTubeThumbnail {
  url: string;
  width?: number;
  height?: number;
}

interface YouTubeSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default?: YouTubeThumbnail;
    medium?: YouTubeThumbnail;
    high?: YouTubeThumbnail;
    standard?: YouTubeThumbnail;
    maxres?: YouTubeThumbnail;
  };
  channelTitle: string;
}

interface YouTubeSearchItemId {
  kind: string;
  videoId: string;
}

interface YouTubeSearchItem {
  kind: string;
  etag: string;
  id: YouTubeSearchItemId;
  snippet: YouTubeSnippet;
}

interface YouTubeSearchResponse { // Kiểu cho response từ /search
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  regionCode?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeSearchItem[];
}

interface YouTubeVideoContentDetails {
    duration: string;
}

interface YouTubeVideoItemDetails { // Item trong response của /videos
    kind: string;
    etag: string;
    id: string; // videoId
    snippet?: YouTubeSnippet;
    contentDetails?: YouTubeVideoContentDetails;
}

interface YouTubeVideosResponse { // Kiểu cho response từ /videos
    kind: string;
    etag: string;
    items: YouTubeVideoItemDetails[];
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
}
// --- Kết thúc định nghĩa Interfaces ---


interface VideoLessonType {
  videoId: string; // Đổi id thành videoId
  title: string;
  thumbnail: string;
  channel: string;
  description: string;
  duration: string;
}

const API_KEY = "AIzaSyBupMzKAKSpfYHjp_6MkxTcnG2oj0IhpDc"; // Tạm thời, nên dùng biến môi trường

export default function YoutubeLearningPage() {
  const [videoLessons, setVideoLessons] = useState<VideoLessonType[]>([]);
  const [recentVideos, setRecentVideos] = useState<VideoLessonType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("sign language for beginners");
  const [searchInput, setSearchInput] = useState("sign language for beginners");
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [showKeyboard, setShowKeyboard] = useState(false);

  useEffect(() => {
    const storedVideos = localStorage.getItem('recentVideos');
    if (storedVideos) {
      setRecentVideos(JSON.parse(storedVideos));
    }
    fetchVideos(searchQuery);
  }, []);


  const fetchVideoDetails = async (videoIds: string[]): Promise<Map<string, string>> => {
    if (videoIds.length === 0) return new Map();
    try {
      // Sử dụng kiểu YouTubeVideosResponse
      const response = await axios.get<YouTubeVideosResponse>(`https://www.googleapis.com/youtube/v3/videos`, {
        params: {
          part: "contentDetails",
          id: videoIds.join(','),
          key: API_KEY,
        },
      });
      const durationsMap = new Map<string, string>();
      response.data.items.forEach((item) => {
        if (item.contentDetails) {
            durationsMap.set(item.id, formatDuration(item.contentDetails.duration));
        }
      });
      return durationsMap;
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết video (thời lượng):", error);
      return new Map();
    }
  };

  const formatDuration = (isoDuration: string): string => {
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "N/A";
    const hours = parseInt(match[1] || "0");
    const minutes = parseInt(match[2] || "0");
    const seconds = parseInt(match[3] || "0");
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };


  const fetchVideos = async (query: string) => {
    if (!query.trim()) {
      setVideoLessons([]);
      return;
    }
    try {
      setLoading(true);
      // Sử dụng kiểu YouTubeSearchResponse
      const response = await axios.get<YouTubeSearchResponse>(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: "snippet",
          maxResults: 12,
          q: query,
          key: API_KEY,
          type: "video",
        },
      });

      const searchData = response.data; // Bây giờ searchData có kiểu YouTubeSearchResponse
      const videoIds = searchData.items.map(item => item.id.videoId);
      const durationsMap = await fetchVideoDetails(videoIds);

      const videos: VideoLessonType[] = searchData.items.map((item) => ({
          videoId: item.id.videoId, // Gán item.id.videoId cho videoId
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url || "", // Fallback
          channel: item.snippet.channelTitle,
          description: item.snippet.description,
          duration: durationsMap.get(item.id.videoId) || "N/A",
        }));

      setVideoLessons(videos);
    } catch (error) {
      console.error("Lỗi khi lấy video từ YouTube:", error);
      setVideoLessons([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchInput.trim() === "") return;
    setSearchQuery(searchInput);
    fetchVideos(searchInput);
    setShowKeyboard(false);
  };

  const handleVideoClick = (lesson: VideoLessonType) => {
    setSelectedVideoId(lesson.videoId); // Sử dụng lesson.videoId
    const updatedRecent = [
      lesson,
      ...recentVideos.filter(v => v.videoId !== lesson.videoId) // So sánh bằng videoId
    ].slice(0, 8);
    setRecentVideos(updatedRecent);
    localStorage.setItem('recentVideos', JSON.stringify(updatedRecent));
  };

  const closeModal = () => {
    setSelectedVideoId(null);
  };

  const keyboardLayout = [
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
    "a", "s", "d", "f", "g", "h", "j", "k", "l",
    "z", "x", "c", "v", "b", "n", "m", " ", "xoá", "tìm"
  ];


  const handleKeyboardInput = (key: string) => {
    if (key === "xoá") {
      setSearchInput((prev) => prev.slice(0, -1));
    } else if (key === "tìm") {
      handleSearch();
    } else if (key === " ") {
      setSearchInput((prev) => prev + " ");
    }
    else {
      setSearchInput((prev) => prev + key);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4 sm:p-6">
      <header className="mb-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">
          Khám Phá Video YouTube
        </h1>
      </header>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow p-3 sm:p-4 gap-2 sm:gap-4">
          <label htmlFor="youtube-search" className="sr-only">Tìm kiếm video</label>
          <input
            id="youtube-search"
            type="text"
            value={searchInput}
            onFocus={() => setShowKeyboard(true)}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Nhập từ khóa tìm kiếm..."
            className="flex-1 text-base sm:text-lg bg-gray-100 rounded-md px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          />
          <GazeButton
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md text-base sm:text-lg flex items-center justify-center gap-2 w-full sm:w-auto"
            onClick={() => { handleSearch(); setShowKeyboard(false); }} // Thêm handleSearch() để tìm kiếm khi nhấn nút này
          >
            <Search size={20} />
            Tìm kiếm
          </GazeButton>
        </div>
      </form>

      {showKeyboard && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-0 left-0 right-0 bg-gray-200 p-2 sm:p-4 rounded-t-xl shadow-2xl z-20"
        >
          <div className="grid grid-cols-10 gap-1 max-w-3xl mx-auto">
            {keyboardLayout.map((key, index) => (
              <GazeButton
                key={index}
                onClick={() => handleKeyboardInput(key)}
                className={`p-2 sm:p-3 text-sm sm:text-base rounded-md flex items-center justify-center
                  ${key === "tìm" ? "col-span-2 bg-blue-500 text-white hover:bg-blue-600" :
                    key === "xoá" ? "col-span-2 bg-red-500 text-white hover:bg-red-600" :
                    key === " " ? "col-span-2 bg-gray-400 hover:bg-gray-500" :
                    "bg-gray-300 hover:bg-gray-400"}`}
              >
                {key === " " ? "Dấu cách" : key.toUpperCase()}
              </GazeButton>
            ))}
          </div>
          <GazeButton
            onClick={() => setShowKeyboard(false)}
            className="mt-2 w-full max-w-xs mx-auto p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Đóng Bàn Phím
          </GazeButton>
        </motion.div>
      )}

      {loading && (
        <div className="text-center text-gray-600 text-xl my-8">Đang tải video...</div>
      )}

      {!loading && videoLessons.length === 0 && searchQuery && (
         <div className="text-center text-gray-600 text-xl my-8">Không tìm thấy video nào cho "{searchQuery}".</div>
      )}

      {!loading && videoLessons.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Kết quả tìm kiếm cho "{searchQuery}"</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {videoLessons.map((lesson, index) => (
               <GazeButton
                key={lesson.videoId + '-search-' + index} // Sử dụng videoId
                onClick={() => handleVideoClick(lesson)}
                className="block w-full h-full rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                aria-label={`Xem video ${lesson.title}`}
              >
                <VideoLessonCard {...lesson} />
              </GazeButton>
            ))}
          </div>
        </section>
      )}

      {!loading && recentVideos.length > 0 && (
         <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Video đã xem gần đây</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {recentVideos.map((lesson, index) => (
              <GazeButton
                key={lesson.videoId + '-recent-' + index} // Sử dụng videoId
                onClick={() => handleVideoClick(lesson)}
                className="block w-full h-full rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                aria-label={`Xem video ${lesson.title}`}
              >
                <VideoLessonCard {...lesson} />
              </GazeButton>
            ))}
          </div>
        </section>
      )}


      {selectedVideoId && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-3xl relative">
             <GazeButton
              onClick={closeModal}
              className="absolute -top-4 -right-4 sm:top-2 sm:right-2 text-white bg-gray-800 rounded-full p-1.5 sm:p-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white z-10"
              aria-label="Đóng video"
            >
              <X size={24} /> {/* Sửa: Bỏ smSize, chỉ dùng size */}
            </GazeButton>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-full rounded-t-lg"
                src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
             {(() => {
                const video = videoLessons.find(v => v.videoId === selectedVideoId) || recentVideos.find(v => v.videoId === selectedVideoId);
                if (video) {
                    return (
                        <div className="p-3 sm:p-4 bg-gray-800 rounded-b-lg">
                            <h3 className="text-base sm:text-lg font-semibold text-white truncate" title={video.title}>{video.title}</h3>
                            <p className="text-xs sm:text-sm text-gray-400 mt-1">Kênh: {video.channel}</p>
                        </div>
                    );
                }
                return null;
            })()}
          </div>
        </motion.div>
      )}
    </div>
  );
}