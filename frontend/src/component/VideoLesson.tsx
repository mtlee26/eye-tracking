"use client";

import React, { useState } from "react";
import { PlayCircle, Clock, X } from "lucide-react";

interface VideoLessonProps {
  title: string;
  duration: string;
  thumbnail: string;
  channel: string;
  videoId: string;
}

const VideoLesson = ({
  title,
  duration,
  thumbnail,
  channel,
  videoId,
}: VideoLessonProps) => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <>
      {/* Video Lesson Card */}
      <div className="bg-white p-8 rounded-lg shadow-lg flex items-center space-x-8 focus:outline-none focus:ring-4 focus:ring-blue-300">
        <img
          src={thumbnail}
          alt={title}
          className="w-40 h-24 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-blue-700 focus:text-blue-600">{title}</h3>
          <div className="flex items-center space-x-6 text-gray-700 mt-4">
            <Clock size={18} />
            <span className="text-lg">{duration}</span>
            <span className="text-md text-gray-600">by {channel}</span>
          </div>
        </div>
        <button
          onClick={() => setShowVideoModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center"
        >
          <PlayCircle size={24} className="mr-3" />
          Watch Now
        </button>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-lg w-full max-w-5xl relative">
            {/* Close Button */}
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <X size={48} />
            </button>

            {/* Embedded YouTube Video */}
            <iframe
              width="100%"
              height="450"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-t-lg"
            ></iframe>

            {/* Video Details */}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-blue-700">{title}</h3>
              <div className="flex items-center space-x-6 text-gray-700 mt-4">
                <Clock size={18} />
                <span className="text-lg">{duration}</span>
                <span className="text-md text-gray-600">by {channel}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoLesson;
