
"use client"

import { useState, useEffect } from "react";
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
  duration: string;
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
  const API_KEY = "AIzaSyBupMzKAKSpfYHjp_6MkxTcnG2oj0IhpDc";

  // Load recent videos from localStorage on mount
  useEffect(() => {
    const storedVideos = localStorage.getItem('recentVideos');
    if (storedVideos) {
      setRecentVideos(JSON.parse(storedVideos));
    }
  }, []);

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
      const recentVideoIds = new Set(recentVideos.map(video => video.id));
      const videos = data.items
        .filter(item => !recentVideoIds.has(item.id.videoId)) // Exclude videos in recentVideos
        .map((item) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          channel: item.snippet.channelTitle,
          duration: "10:00",
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
    if (searchInput.trim() === "") return;

    setSearchQuery(searchInput);
    fetchVideos(searchInput);
  };

  const handleVideoClick = (lesson: VideoLessonType) => {
    setSelectedVideoId(lesson.id);
    
    // Update recent videos
    const updatedRecent = [
      lesson,
      ...recentVideos.filter(v => v.id !== lesson.id)
    ].slice(0, 10); // Keep only last 10 videos
    
    setRecentVideos(updatedRecent);
    localStorage.setItem('recentVideos', JSON.stringify(updatedRecent));
  };

  const closeModal = () => {
    setSelectedVideoId(null);
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

  return (
    <div className="flex min-h-screen bg-gray-100 p-6">
      <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
          LET WATCH YOUTUBE
        </h1>

        <form onSubmit={handleSearch} className="mb-6 space-y-4">
          <label htmlFor="search" className="sr-only">Search Videos</label>
          <div className="flex items-center bg-gray-200 rounded-lg p-4 space-x-4">
            <input
              id="search"
              type="text"
              value={searchInput}
              onClick={() => setShowKeyboard(true)}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for videos..."
              className="flex-1 text-lg bg-transparent outline-none px-4 py-3 hover:scale-105 hover:bg-gray-300 transition-transform duration-300"
              style={{ fontSize: "1.25rem" }}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 hover:scale-110 text-white px-6 py-3 rounded-lg text-lg transition-transform duration-300"
            >
              <Search size={24} />
            </button>
          </div>

          {showKeyboard && (
            <div className="fixed bottom-10 left-0 right-0 bg-gray-800 p-4 rounded-lg shadow-lg grid grid-cols-10 gap-2">
              {"abcdefghijklmnopqrstuvwxyz ".split("").map((char, index) => (
                <button
                  key={`key-${index}`}
                  className="p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500 hover:scale-105 transition-transform duration-300"
                  onClick={() => selectKey(char)}
                >
                  {char === " " ? "Space" : char}
                </button>
              ))}
              <button
                key="delete"
                className="p-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 hover:scale-105 transition-transform duration-300"
                onClick={deleteKey}
              >
                Xóa
              </button>
              <button
                key="close"
                className="p-4 bg-red-600 text-white rounded-lg hover:bg-red-500 hover:scale-105 transition-transform duration-300"
                onClick={closeKeyboard}
              >
                Đóng
              </button>
            </div>
          )}

          {suggestions.length > 0 && (
            <ul className="bg-white border rounded mt-2 shadow text-lg max-h-64 overflow-auto">
              {suggestions.map((s, index) => (
                <li
                  key={`suggestion-${index}`}
                  onClick={() => {
                    setSearchInput(s);
                    setSearchQuery(s);
                    fetchVideos(s);
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
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Search Results</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {loading ? (
                    <div className="text-center text-gray-600 text-xl col-span-full">Đang tải video...</div>
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
                          <h3 className="text-xl font-semibold text-blue-700">{lesson.title}</h3>
                          <p className="text-sm text-gray-600">{lesson.channel}</p>
                          <p className="text-sm text-gray-500">{lesson.duration}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {recentVideos.length > 0 && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recently Watched</h2>
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
                        <h3 className="text-xl font-semibold text-blue-700">{lesson.title}</h3>
                        <p className="text-sm text-gray-600">{lesson.channel}</p>
                        <p className="text-sm text-gray-500">{lesson.duration}</p>
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