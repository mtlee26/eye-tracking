import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import axios from "axios";
import { motion } from "framer-motion";
import GazeButton from "@/component/gazeButton";

export const metadata = {
  title: "Read | Book | Reading | Eyetertainment",
};

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

interface ChapterImage {
  id: number;
  url: string;
}

interface ChapterData {
  domain_cdn: string;
  item: {
    chapter_path: string;
    chapter_image: { image_file: string; image_page: number }[];
    comic_name?: string;
  };
}

function LazyImage({ src, alt, className }: LazyImageProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    document.title = metadata.title;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && imgRef.current) {
          imgRef.current.src = src;
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [src]);

  return (
    <img
      ref={imgRef}
      alt={alt}
      className={className}
      style={{ filter: "blur(10px)", transition: "filter 0.3s ease-out" }}
      onLoad={(e) => (e.currentTarget.style.filter = "none")}
    />
  );
}

export default function ChapterDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [chapterImages, setChapterImages] = useState<ChapterImage[]>([]);
  const [chapterTitle, setChapterTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pagesPerPage = 2;

  useEffect(() => {
    if (id && typeof id === "string") {
      fetchChapterContent(id);
    }

    return () => {
      setChapterImages([]);
    };
  }, [id]);

  const fetchChapterContent = async (chapterId: string) => {
    try {
      const response = await axios.get<{
        data: ChapterData;
      }>(`https://sv1.otruyencdn.com/v1/api/chapter/${chapterId}`, {
        headers: { Accept: "application/json" },
      });

      const data = response.data?.data;

      if (data) {
        const domain = data.domain_cdn;
        const path = data.item.chapter_path;
        const images = data.item.chapter_image.map((img) => ({
          id: img.image_page,
          url: `${domain}/${path}/${img.image_file}`,
        }));

        preloadImages(images);
        setChapterImages(images);
        setChapterTitle(data.item.comic_name || "Nội dung chương");
      }
    } catch (error: any) {
      console.error("Error fetching chapter content:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const preloadImages = (images: ChapterImage[]) => {
    images.forEach((img) => {
      const preloadedImage = new Image();
      preloadedImage.src = img.url;
    });
  };

  const handleNextPage = () => {
    if (currentPage < chapterImages.length - pagesPerPage) {
      setCurrentPage(currentPage + pagesPerPage);
      document.documentElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - pagesPerPage);
      document.documentElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 flex flex-col items-center justify-center h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="flex flex-col items-center space-y-4"
        >
          <motion.div
            className="w-16 h-16 border-4 border-[#adc6ff] border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          ></motion.div>
          <p className="text-lg font-semibold text-[#adc6ff]">
            Đang tải dữ liệu...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 flex flex-col justify-center items-center h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-16 mb-16 text-4xl font-bold text-center text-[#e2e2e9]"
      >
        {chapterTitle}
      </motion.h1>

      <motion.div
        className="flex items-center justify-center mb-16 space-x-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <GazeButton
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className={`p-10 rounded-full bg-[#1e1f25] text-white text-5xl shadow-lg transform transition-transform duration-300 hover:scale-110 ${
            currentPage === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-xl"
          } active:scale-95`}
        >
          <AiOutlineLeft />
        </GazeButton>

        <motion.div
          className="grid gap-4 md:gap-8 sm:grid-cols-2 md:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {chapterImages
            .slice(currentPage, currentPage + pagesPerPage)
            .map((img) => (
              <motion.div
                key={img.id}
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25, delay: img.id * 0.1 }}
              >
                <LazyImage
                  src={img.url}
                  alt={`Page ${img.id}`}
                  className="max-h-[63vh] max-w-[27vw] shadow-lg rounded-lg object-contain"
                />
              </motion.div>
            ))}
        </motion.div>

        <GazeButton
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNextPage}
          disabled={currentPage >= chapterImages.length - pagesPerPage}
          className={`p-10 rounded-full bg-[#1e1f25] text-white text-5xl shadow-lg transform transition-transform duration-300 hover:scale-110 ${
            currentPage >= chapterImages.length - pagesPerPage
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-xl"
          } active:scale-95`}
        >
          <AiOutlineRight />
        </GazeButton>
      </motion.div>

      <GazeButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.back()}
        className="bg-[#bfc6dc] text-[#293041] px-6 py-2 rounded-lg hover:bg-[#3f4759] hover:text-[#dbe2f9] shadow-lg"
        style={{ width: "200px", height: "100px" }}
      >
        Back
      </GazeButton>
    </div>
  );
}
