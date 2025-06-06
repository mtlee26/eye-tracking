"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Search, ChevronUp, ChevronDown } from "lucide-react";
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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const videoListRef = useRef<HTMLDivElement>(null); // Ref for the video list section

  const AUTO_CLICK_DELAY = 2000;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleVideoClick = (lesson: VideoLessonType) => {
    setSelectedVideoId(lesson.id);
    setIsVideoPlaying(false);

    const updatedRecent = [
      lesson,
      ...recentVideos.filter((v) => v.id !== lesson.id),
    ].slice(0, 10);
    setRecentVideos(updatedRecent);
    localStorage.setItem("recentVideos", JSON.stringify(updatedRecent));
  };

  const closeModal = () => {
    setSelectedVideoId(null);
    setIsVideoPlaying(false);
  };

  const selectKey = (char: string) => {
    setSearchInput((prev) => prev + char);
  };

  const deleteKey = () => {
    setSearchInput((prev) => prev.slice(0, -1));
  };

  const closeKeyboard = () => {
    setShowKeyboard(false);
  };

  // Function to handle scroll up
  const handleScrollUp = () => {
    if (videoListRef.current) {
      videoListRef.current.scrollBy({ top: -100, behavior: "smooth" });
    }
  };

  // Function to handle scroll down
  const handleScrollDown = () => {
    if (videoListRef.current) {
      videoListRef.current.scrollBy({ top: 100, behavior: "smooth" });
    }
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
          setShowKeyboard(true);
        } else if (hoveredElement === "searchButton") {
          handleSearch(new Event("submit") as any);
        } else if (hoveredElement.startsWith("video-")) {
          const videoId = hoveredElement.replace("video-", "");
          const lesson = [...videoLessons, ...recentVideos].find(
            (v) => v.id === videoId
          );
          if (lesson) handleVideoClick(lesson);
        } else if (hoveredElement === "closeModal") {
          closeModal();
        } else if (hoveredElement === "playVideo" && !isVideoPlaying) {
          setIsVideoPlaying(true);
        } else if (hoveredElement === "delete") {
          deleteKey();
        } else if (hoveredElement === "close") {
          closeKeyboard();
        } else if (hoveredElement === "scrollUpButton") {
          handleScrollUp();
        } else if (hoveredElement === "scrollDownButton") {
          handleScrollDown();
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
  }, [hoveredElement, videoLessons, recentVideos, isVideoPlaying]);

  return (
    <div className="w-full min-h-screen p-0">
      <div className="w-full h-full bg-white p-4 sm:p-6">
        <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
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
                onMouseEnter={() => setHoveredElement("searchInput")}
                onMouseLeave={() => setHoveredElement(null)}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for videos..."
                className="flex-1 text-lg bg-transparent outline-none px-4 py-3 hover:scale-105 hover:bg-gray-300 transition-transform duration-300 w-full"
                style={{ fontSize: "1.25rem" }}
              />
              {hoveredElement === "searchInput" && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-blue-700 transition-all duration-50"
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
                className="bg-blue-600 hover:bg-blue-700 hover:scale-110 text-white px-6 py-3 rounded-lg text-lg transition-transform duration-300"
              >
                <Search size={24} />
              </button>
              {hoveredElement === "searchButton" && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-blue-700 transition-all duration-50"
                  style={{
                    width: `${progress["searchButton"] || 0}%`,
                  }}
                />
              )}
            </div>
          </div>

          {showKeyboard && (
            <div className="fixed bottom-10 left-0 right-0 bg-gray-800 p-4 rounded-lg shadow-lg grid grid-cols-10 gap-2 z-60">
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
                  >
                    {char === " " ? "Space" : char}
                  </button>
                  {hoveredElement === (char === " " ? "Space" : char) && (
                    <div
                      className="absolute bottom-0 left-0 h-1 bg-blue-700 transition-all duration-50"
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
                >
                  Xóa
                </button>
                {hoveredElement === "delete" && (
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-blue-700 transition-all duration-50"
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
                  className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 hover:scale-105 transition-transform duration-300 w-full"
                >
                  Đóng
                </button>
                {hoveredElement === "close" && (
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-blue-800 transition-all duration-50"
                    style={{
                      width: `${progress["close"] || 0}%`,
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </form>

        {/* Scroll Buttons (Left side) */}
        <div className="hidden md:flex flex-col gap-4 fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
          <div className="relative">
            <button
              onMouseEnter={() => setHoveredElement("scrollUpButton")}
              onMouseLeave={() => setHoveredElement(null)}
              className="p-5 bg-gray-300 text-white rounded-full hover:bg-gray-700 transition-colors text-4xl shadow-2xl w-16 h-16 flex items-center justify-center"
            >
              <ChevronUp />
            </button>
            {hoveredElement === "scrollUpButton" && (
              <div
                className="absolute bottom-0 left-0 h-1 bg-blue-700 transition-all duration-50 w-full"
                style={{
                  width: `${progress["scrollUpButton"] || 0}%`,
                }}
              />
            )}
          </div>
          <div className="relative">
            <button
              onMouseEnter={() => setHoveredElement("scrollDownButton")}
              onMouseLeave={() => setHoveredElement(null)}
              className="p-5 bg-gray-300 text-white rounded-full hover:bg-gray-700 transition-colors text-4xl shadow-2xl w-16 h-16 flex items-center justify-center"
            >
              <ChevronDown />
            </button>
            {hoveredElement === "scrollDownButton" && (
              <div
                className="absolute bottom-0 left-0 h-1 bg-blue-600 transition-all duration-50 w-full"
                style={{
                  width: `${progress["scrollDownButton"] || 0}%`,
                }}
              />
            )}
          </div>
        </div>

        {activeTab === "video-lessons" && (
          <div
            ref={videoListRef}
            className="overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 200px)" }}
          >
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
                        className="relative bg-gray-200 rounded-lg shadow-md cursor-pointer hover:scale-105 hover:bg-gray-300 transition-all duration-300"
                        onMouseEnter={() => setHoveredElement(`video-${lesson.id}`)}
                        onMouseLeave={() => setHoveredElement(null)}
                      >
                        <img
                          src={lesson.thumbnail}
                          alt={lesson.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                          <h3 className="text-xl font-semibold text-gray-700">
                            {lesson.title}
                          </h3>
                          <p className="text-sm text-gray-600">{lesson.channel}</p>
                        </div>
                        {hoveredElement === `video-${lesson.id}` && (
                          <div
                            className="absolute bottom-0 left-0 h-1 bg-gray-500 transition-all duration-50 w-full"
                            style={{
                              width: `${progress[`video-${lesson.id}`] || 0}%`,
                            }}
                          />
                        )}
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
                      className="relative bg-gray-200 rounded-lg shadow-md cursor-pointer hover:scale-105 hover:bg-gray-300 transition-all duration-300"
                      onMouseEnter={() => setHoveredElement(`video-${lesson.id}`)}
                      onMouseLeave={() => setHoveredElement(null)}
                    >
                      <img
                        src={lesson.thumbnail}
                        alt={lesson.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-700">
                          {lesson.title}
                        </h3>
                        <p className="text-sm text-gray-600">{lesson.channel}</p>
                      </div>
                      {hoveredElement === `video-${lesson.id}` && (
                        <div
                          className="absolute bottom-0 left-0 h-1 bg-gray-500 transition-all duration-50 w-full"
                          style={{
                            width: `${progress[`video-${lesson.id}`] || 0}%`,
                          }}
                        />
                      )}
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
            <div className="relative bg-transparent p-0 rounded-none shadow-none w-full max-w-6xl">
              <div className="absolute top-4 right-4 z-50">
                <div className="relative">
                  <button
                    onMouseEnter={() => setHoveredElement("closeModal")}
                    onMouseLeave={() => setHoveredElement(null)}
                    className="text-gray-600 hover:text-white bg-red-600 rounded-full transition-colors"
                    style={{ fontSize: "3rem", padding: "0.5rem 1rem" }}
                  >
                    ×
                  </button>
                  {hoveredElement === "closeModal" && (
                    <div
                      className="absolute bottom-0 left-0 h-1 bg-red-800 transition-all duration-50 w-full"
                      style={{
                        width: `${progress["closeModal"] || 0}%`,
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="relative">
                <iframe
                  className="w-full h-[70vh] sm:h-[80vh] object-cover rounded-lg"
                  src={`https://www.youtube.com/embed/${selectedVideoId}${
                    isVideoPlaying ? "?autoplay=1" : ""
                  }`}
                  title="Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onMouseEnter={() => setHoveredElement("playVideo")}
                  onMouseLeave={() => setHoveredElement(null)}
                />
                {hoveredElement === "playVideo" && !isVideoPlaying && (
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-blue-700 transition-all duration-50 w-full"
                    style={{
                      width: `${progress["playVideo"] || 0}%`,
                    }}
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}