"use client"

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface YouTubeVideo {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: { medium: { url: string } };
    channelTitle: string;
  };
}

interface YouTubeAPIResponse {
  items: YouTubeVideo[];
}

interface VideoLessonType {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
}

export default function VideoLearning() {
  const [activeTab, setActiveTab] = useState("video-lessons");
  const [videoLessons, setVideoLessons] = useState<VideoLessonType[]>([]);
  const [recentVideos, setRecentVideos] = useState<VideoLessonType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [showKeyboard, setShowKeyboard] = useState(false);

  const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
  };

  const debouncedInput = useDebounce(searchInput, 300);
  const API_KEY = "AIzaSyBOFUcW7CR8Go_Q0Yls0auFN97RwTQxPv0";

  useEffect(() => {
    const storedVideos = localStorage.getItem("recentVideos");
    if (storedVideos) {
      setRecentVideos(JSON.parse(storedVideos));
    }
  }, []);

  useEffect(() => {
    if (debouncedInput.trim() === "") {
      setVideoLessons([]);
      setSearchQuery("");
      return;
    }

    setSearchQuery(debouncedInput);
    fetchVideos(debouncedInput);
  }, [debouncedInput]);

  const fetchVideos = async (query: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: "snippet",
          maxResults: 10,
          q: query,
          key: API_KEY,
          type: "video",
        },
      });

      const data = response.data as YouTubeAPIResponse;
      const recentVideoIds = new Set(recentVideos.map((video) => video.id));
      const videos = data.items
        .filter((item) => !recentVideoIds.has(item.id.videoId))
        .map((item) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          channel: item.snippet.channelTitle,
        }));

      setVideoLessons(videos);
    } catch (error) {
      console.error("Lỗi khi lấy video từ YouTube:", error);
      // if (axios.isAxiosError(error)) {
      //   console.error("Response data:", error.response?.data);
      //   console.error("Status:", error.response?.status);
      // }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // No need to call fetchVideos here, handled by useEffect
  };

  const handleVideoClick = (lesson: VideoLessonType) => {
    setSelectedVideoId(lesson.id);

    const updatedRecent = [
      lesson,
      ...recentVideos.filter((v) => v.id !== lesson.id),
    ].slice(0, 10);
    setRecentVideos(updatedRecent);
    localStorage.setItem("recentVideos", JSON.stringify(updatedRecent));
  };

  const closeModal = () => {
    setSelectedVideoId(null);
  };

  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const AUTO_CLICK_DELAY = 2000; // 3 seconds
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const selectKey = (char: string) => {
    setSearchInput((prev) => prev + char);
  };

  const deleteKey = () => {
    setSearchInput((prev) => prev.slice(0, -1));
  };

  const closeKeyboard = () => {
    setShowKeyboard(false);
  };

  useEffect(() => {
    if (!hoveredElement) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setProgress({});
      return;
    }

    const startTime = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progressPercent = (elapsed / AUTO_CLICK_DELAY) * 100;
      setProgress((prev) => ({
        ...prev,
        [hoveredElement]: Math.min(progressPercent, 100),
      }));

      if (elapsed >= AUTO_CLICK_DELAY) {
        if (hoveredElement === "searchInput") {
          setShowKeyboard(true); // Auto-open keyboard when hovering input
        } else if (hoveredElement === "searchButton") {
          handleSearch(new Event("submit") as any); // Auto-submit form
        } else if (hoveredElement === "delete") {
          deleteKey();
        } else if (hoveredElement === "close") {
          closeKeyboard();
        } else {
          selectKey(hoveredElement === "Space" ? " " : hoveredElement);
        }
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setProgress((prev) => ({ ...prev, [hoveredElement]: 0 }));
        setHoveredElement(null);
      }
    }, 50);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [hoveredElement]);

  return (
    <div className="flex min-h-screen bg-gray-100 p-6">
      <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">
          Khám Phá Video Youtube
        </h1>

        <form onSubmit={handleSearch} className="mb-6 space-y-4">
          <label htmlFor="search" className="sr-only">
            Search Videos
          </label>
          <div className="flex items-center bg-gray-200 rounded-lg p-4 space-x-4">
            <div className="relative flex-1">
              <input
                id="search"
                type="text"
                value={searchInput}
                onClick={() => setShowKeyboard(true)}
                onChange={(e) => setSearchInput(e.target.value)}
                onMouseEnter={() => setHoveredElement("searchInput")}
                onMouseLeave={() => setHoveredElement(null)}
                placeholder="Search for videos..."
                className="flex-1 text-lg bg-transparent outline-none px-4 py-3 hover:scale-105 hover:bg-gray-300 transition-transform duration-300 w-full"
                style={{ fontSize: "1.25rem" }}
              />
              {hoveredElement === "searchInput" && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50"
                  style={{
                    width: `${progress["searchInput"] || 0}%`,
                  }}
                />
              )}
            </div>
            <div className="relative">
              <button
                type="submit"
                onMouseEnter={() => setHoveredElement("searchButton")}
                onMouseLeave={() => setHoveredElement(null)}
                className="bg-red-600 hover:bg-red-700 hover:scale-110 text-white px-6 py-3 rounded-lg text-lg transition-transform duration-300"
              >
                <Search size={24} />
              </button>
              {hoveredElement === "searchButton" && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50"
                  style={{
                    width: `${progress["searchButton"] || 0}%`,
                  }}
                />
              )}
            </div>
          </div>

          {showKeyboard && (
            <div className="fixed bottom-10 left-0 right-0 bg-gray-800 p-4 rounded-lg shadow-lg grid grid-cols-10 gap-2">
              {"abcdefghijklmnopqrstuvwxyz ".split("").map((char, indexkb) => (
                <div
                  key={`key-${indexkb}`}
                  className="relative"
                  onMouseEnter={() =>
                    setHoveredElement(char === " " ? "Space" : char)
                  }
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  <button
                    className="p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500 hover:scale-105 transition-transform duration-300 w-full"
                    onClick={() => selectKey(char)}
                  >
                    {char === " " ? "Space" : char}
                  </button>
                  {hoveredElement === (char === " " ? "Space" : char) && (
                    <div
                      className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50"
                      style={{
                        width: `${progress[char === " " ? "Space" : char] || 0}%`,
                      }}
                    />
                  )}
                </div>
              ))}
              <div
                className="relative"
                onMouseEnter={() => setHoveredElement("delete")}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <button
                  className="p-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 hover:scale-105 transition-transform duration-300 w-full"
                  onClick={deleteKey}
                >
                  Xóa
                </button>
                {hoveredElement === "delete" && (
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50"
                    style={{
                      width: `${progress["delete"] || 0}%`,
                    }}
                  />
                )}
              </div>
              <div
                className="relative"
                onMouseEnter={() => setHoveredElement("close")}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <button
                  className="p-4 bg-red-600 text-white rounded-lg hover:bg-red-500 hover:scale-105 transition-transform duration-300 w-full"
                  onClick={closeKeyboard}
                >
                  Đóng
                </button>
                {hoveredElement === "close" && (
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50"
                    style={{
                      width: `${progress["close"] || 0}%`,
                    }}
                  />
                )}
              </div>
            </div>
          )}

          {suggestions.length > 0 && (
            <ul className="bg-white border rounded mt-2 shadow text-lg max-h-64 overflow-auto">
              {suggestions.map((s, indexsg) => (
                <li
                  key={`suggestion-${indexsg}`}
                  onClick={() => {
                    setSearchInput(s);
                    setSearchQuery(s);
                  }}
                  className="cursor-pointer px-6 py-4 hover:bg-blue-100 hover:scale-105 transition-transform duration-300"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </form>

        {activeTab === "video-lessons" && (
          <div>
            {videoLessons.length > 0 && searchQuery && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Search Results
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {loading ? (
                    <div className="text-center text-gray-600 text-xl col-span-full">
                      Đang tải video...
                    </div>
                  ) : (
                    videoLessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="bg-gray-200 rounded-lg shadow-md cursor-pointer hover:scale-105 hover:bg-gray-300 transition-all duration-300"
                        onClick={() => handleVideoClick(lesson)}
                      >
                        <img
                          src={lesson.thumbnail}
                          alt={lesson.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                          <h3 className="text-xl font-semibold text-blue-700">
                            {lesson.title}
                          </h3>
                          <p className="text-sm text-gray-600">{lesson.channel}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {recentVideos.length > 0 && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Recently Watched
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {recentVideos.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="bg-gray-200 rounded-lg shadow-md cursor-pointer hover:scale-105 hover:bg-gray-300 transition-all duration-300"
                      onClick={() => handleVideoClick(lesson)}
                    >
                      <img
                        src={lesson.thumbnail}
                        alt={lesson.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-blue-700">
                          {lesson.title}
                        </h3>
                        <p className="text-sm text-gray-600">{lesson.channel}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedVideoId && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-transparent p-0 rounded-none shadow-none w-full max-w-6xl">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-white transition-colors"
                style={{ fontSize: "3rem", padding: "1rem 1.5rem" }}
              >
                ×
              </button>
              <iframe
                className="w-full h-[70vh] sm:h-[80vh] object-cover rounded-lg"
                src={`https://www.youtube.com/embed/${selectedVideoId}`}
                title="Video"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}