// "use client";
// import { useRouter } from "next/navigation";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
// import { motion } from "framer-motion";
// import GazeButton from "@/component/gazeButton";

// // Kiểu dữ liệu
// type Chapter = {
//   chapter_name: string;
//   chapter_content: string;
// };

// type Book = {
//   name: string;
//   thumb_url: string;
//   chapters: Chapter[];
// };

// // API response kiểu
// type BookResponse = {
//   data: {
//     item: Book;
//   };
// };

// export default function BookDetail() {
//   const router = useRouter();
//   const params = useParams();
//   const slug = params?.slug as string || "";
//   const [book, setBook] = useState<Book | null>(null);
//   const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
//   const chaptersPerPage = 4;

//   useEffect(() => {
//     if (slug && typeof slug === "string") {
//       fetchBookDetail(slug);
//     }
//   }, [slug]);

//   // Lấy chi tiết sách từ Gutenberg và phân tích HTML
//   const fetchBookDetail = async (bookSlug: string) => {
//     try {
//     //   const response = await axios.get(
//     //     `https://cors-anywhere.herokuapp.com/https://gutendex.com/books/?search=pride+and+prejudice`
// 		//   );
// 		const response = await fetch('/api/proxy');
// 		const data = await response.json();
// 		console.log("Book detail response:", data);
//       const bookData = (data as { results: any[] })?.results?.[0] || null;
// console.log(bookData)
//       if (bookData) {
//         // Lấy nội dung sách từ link HTML
// 		  const htmlUrl = bookData.formats["text/html"];
// 		  console.log(htmlUrl)
//         const htmlResponse = await fetch('/api/process_book');
// 		  const htmlContent = await htmlResponse.text();
// 		  console.log(htmlContent)

//         // Phân tích HTML để lấy các chương
//         const chapters = parseChaptersFromHtml(htmlContent as string);
//         setBook({
//           name: bookData.title,
//           thumb_url: bookData.cover,
//           chapters: chapters,
//         });
//       }
//     } catch (error: any) {
//       console.error("Error fetching book detail:", error.message);
//     }
//   };

//   // Phân tích nội dung HTML để chia các chương
// 	const parseChaptersFromHtml = (htmlContent: string): Chapter[] => {
// 	  console.log(htmlContent)
//     const chapters: Chapter[] = [];
//     const chapterRegex = /<h2[^>]*>(.*?)<\/h2>/g; // Regex để lấy tên chương (thẻ <h2>)
//     const contentRegex = /<p[^>]*>(.*?)<\/p>/g; // Regex để lấy nội dung chương (thẻ <p>)

//     let match;
//     let chapterIndex = 0;
//     let chapterName = "";
//     let chapterContent = "";

//     while ((match = chapterRegex.exec(htmlContent)) !== null) {
//       chapterName = match[1];
//       chapterContent = "";

//       // Lấy nội dung chương
//       let contentMatch;
//       while ((contentMatch = contentRegex.exec(htmlContent)) !== null) {
//         chapterContent += contentMatch[1] + "\n";
//       }

//       chapters.push({
//         chapter_name: chapterName,
//         chapter_content: chapterContent.trim(),
//       });

//       chapterIndex++;
// 		}
// 		console.log(chapters)

//     return chapters;
//   };

//   const cleanContent = (rawContent: string | undefined) => {
//     if (!rawContent) return "";
//     return rawContent.length > 500
//       ? rawContent.slice(0, 500) + "..."
//       : rawContent.trim();
//   };

//   const handleNext = () => {
//     if (
//       book &&
//       currentChapterIndex + chaptersPerPage < book.chapters.length
//     ) {
//       setCurrentChapterIndex(currentChapterIndex + chaptersPerPage);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentChapterIndex > 0) {
//       setCurrentChapterIndex(currentChapterIndex - chaptersPerPage);
//     }
//   };

//   if (!book) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{
//             duration: 0.5,
//             repeat: Infinity,
//             repeatType: "reverse",
//           }}
//           className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
//         ></motion.div>
//       </div>
//     );
//   }

//   const chapters = book.chapters || [];
//   const totalPages = Math.ceil(chapters.length / chaptersPerPage);
//   const currentPage = Math.floor(currentChapterIndex / chaptersPerPage) + 1;

//   return (
//     <div className="container mx-auto p-6 flex flex-col items-center justify-center h-screen mt-10">
//       <div className="flex items-start space-x-8 mb-16">
//         <img
//           src={book.thumb_url}
//           alt={book.name}
//           className="w-1/4 h-auto object-cover rounded-lg shadow-lg"
//           style={{ maxWidth: "300px" }}
//         />

//         <div className="flex-1 max-w-2xl">
//           <h1 className="text-3xl font-bold mb-4 text-black text-left">
//             {book.name}
//           </h1>
//           <p className="text-lg text-black mb-6 text-left">
//             {cleanContent(book.chapters[0].chapter_content) || "Không có mô tả."}
//           </p>
//         </div>
//       </div>

//       <div className="flex items-center justify-center mb-16 space-x-8">
//         <GazeButton
//           whileHover={{ scale: 1.2 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={handlePrevious}
//           disabled={currentChapterIndex === 0}
//           className={`p-10 rounded-full bg-[#1e1f25] text-white text-5xl shadow-lg transform transition-transform duration-300 hover:scale-110 ${
//             currentChapterIndex === 0
//               ? "opacity-50 cursor-not-allowed"
//               : "hover:shadow-xl"
//           }active:scale-95`}
//         >
//           <AiOutlineLeft />
//         </GazeButton>

//         <motion.div
//           className="grid gap-4 md:gap-8 sm:grid-cols-2 md:grid-cols-4"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           style={{
//             gridTemplateColumns: `repeat(${chaptersPerPage}, 1fr)`,
//           }}
//         >
//           {chapters
//             .slice(currentChapterIndex, currentChapterIndex + chaptersPerPage)
//             .map((chapter, index) => (
//               <GazeButton
//                 key={index}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-[#bfc6dc] text-[#293041] rounded-lg hover:bg-[#3f4759] hover:text-[#dbe2f9] text-2xl flex items-center justify-center shadow-lg"
//                 style={{
//                   width: "200px",
//                   height: "100px",
//                 }}
//                 onClick={() => {
//                   router.push(`/book/chapter/${index}`);
//                 }}
//               >
//                 Chap {chapter.chapter_name}
//               </GazeButton>
//             ))}
//         </motion.div>

//         <GazeButton
//           whileHover={{ scale: 1.2 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={handleNext}
//           disabled={currentChapterIndex + chaptersPerPage >= chapters.length}
//           className={`p-10 rounded-full bg-[#1e1f25] text-white text-5xl shadow-lg transform transition-transform duration-300 hover:scale-110 ${
//             currentChapterIndex + chaptersPerPage >= chapters.length
//               ? "opacity-50 cursor-not-allowed"
//               : "hover:shadow-xl"
//           }active:scale-95`}
//         >
//           <AiOutlineRight />
//         </GazeButton>
//       </div>

//       <div className="flex mt-8">
//         <GazeButton
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => router.back()}
//           className="bg-[#bfc6dc] text-2xl text-[#293041] px-6 py-2 rounded-lg hover:bg-[#3f4759] hover:text-[#dbe2f9] shadow-lg"
//           style={{ width: "200px", height: "100px" }}
//         >
//           Back
//         </GazeButton>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import GazeButton from "@/component/gazeButton";

type Chapter = {
  id: string;
  title: string;
  content: string[];
};

type Novel = {
  id: string;
  title: string;
  author: string;
  description: string;
  thumbnail: string;
  chapters: Chapter[];
  metadata: {
    publisher?: string;
    language?: string;
    releaseDate?: string;
  };
};

export default function NovelReaderPage() {
  const params = useParams();
  const router = useRouter();
  const [novel, setNovel] = useState<Novel | null>(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isReading, setIsReading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
	const paragraphsPerPage = 8;
	
  // Fetch novel data
  useEffect(() => {
    const fetchNovel = async () => {
      try {

        
			const response = await fetch('/api/proxy');
		const data = await response.json();
		console.log("Book detail response:", data);
		  const bookData = (data as { results: any[] })?.results?.[0] || null;
		        if (bookData) {
        // Lấy nội dung sách từ link HTML
		  const htmlUrl = bookData.formats["text/html"];
					console.log(htmlUrl)
					const thumbnailUrl = bookData.formats["image/jpeg"];
        const htmlResponse = await fetch('/api/process_book');
		  const htmlContent = await htmlResponse.json();
		  console.log(htmlContent)

		  const parsedChapters: Chapter[] = htmlContent.chapters
		  .filter((ch: any) => 
			typeof ch.title === "string" && 
			ch.title.toLowerCase().includes("chapter") && 
			Array.isArray(ch.content) && ch.content.length > 0
		  )
		  .map((ch: any, idx: number) => ({
			id: `chapter-${idx + 1}`,
			title: ch.title.replace(/\n/g, ' ').trim(),
			content: ch.content
		  }));
	  
		// Tạo đối tượng novel từ dữ liệu
		const novelData: Novel = {
		  id: params?.slug as string,
		  title: bookData.title,
		  author: bookData.authors?.[0]?.name || "Unknown",
		  description: bookData.description || "No description available.",
		  thumbnail: thumbnailUrl || "/default-cover.jpg",
		  chapters: parsedChapters,
		  metadata: {
			publisher: "Project Gutenberg",
			language: bookData.languages?.[0] || "English",
			releaseDate: bookData.release_date || "Unknown"
		  }
		};
	  
		setNovel(novelData);
      }
        // setNovel(bookData);
      } catch (error) {
        console.error("Failed to fetch novel:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNovel();
  }, [params?.slug]);

  // Reset page when chapter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [currentChapterIndex]);

  const renderGutenbergHeader = () => (
    <div id="pg-header" className="mb-10 text-center">
      <h1 id="pg-header-heading" className="text-3xl font-bold mb-4">
        {novel?.title}
      </h1>
      <div className="text-xl mb-6">by {novel?.author}</div>
      
      <div id="pg-start-separator" className="my-10 border-t border-gray-300 w-1/2 mx-auto"></div>

    </div>
  );


  const renderReadingContent = () => {
    if (!novel) return null;
    
    const chapter = novel.chapters[currentChapterIndex];
    const startIdx = (currentPage - 1) * paragraphsPerPage;
    const endIdx = startIdx + paragraphsPerPage;
    const visibleParagraphs = chapter.content.slice(startIdx, endIdx);
    const totalPages = Math.ceil(chapter.content.length / paragraphsPerPage);

    return (
      <div className="max-w-3xl mx-auto">
        {/* Chapter Navigation */}
        <div className="flex justify-between items-center mb-8 bg-gray-50 p-4 rounded-lg">
          <GazeButton
            onClick={() => setCurrentChapterIndex(i => Math.max(0, i - 1))}
            disabled={currentChapterIndex === 0}
            className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
          >
            ← Previous Chapter
          </GazeButton>
          
          <span className="font-medium text-lg">
            {chapter.title}
          </span>
          
          <GazeButton
            onClick={() => setCurrentChapterIndex(i => Math.min(novel.chapters.length - 1, i + 1))}
            disabled={currentChapterIndex === novel.chapters.length - 1}
            className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
          >
            Next Chapter →
          </GazeButton>
        </div>

        {/* Chapter Content */}
        <div className="prose lg:prose-xl mx-auto">
          {visibleParagraphs.map((para, idx) => (
            <motion.p 
              key={idx}
              className="text-justify indent-8 my-4 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Page Navigation */}
        <div className="flex justify-between items-center mt-10 mb-16">
          <GazeButton
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
          >
            ← Previous Page
          </GazeButton>
          
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          
          <GazeButton
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={currentPage >= totalPages}
            className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
          >
            Next Page →
          </GazeButton>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!novel) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Novel Not Found</h1>
        <GazeButton
          onClick={() => router.back()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back
        </GazeButton>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-10 px-4 sm:px-6">
      {!isReading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {renderGutenbergHeader()}
          
          <div className="flex flex-col items-center my-16 gap-6">
            <motion.img
              src={novel.thumbnail}
              alt={novel.title}
              className="w-48 h-64 object-cover rounded-lg shadow-xl"
              whileHover={{ scale: 1.03 }}
            />
            
            <p className="text-lg text-gray-700 max-w-2xl text-center">
              {novel.description}
            </p>
            
            <GazeButton
              onClick={() => setIsReading(true)}
              className="px-8 py-4 bg-blue-600 text-white text-xl rounded-lg hover:bg-blue-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Reading
            </GazeButton>
          </div>
          
          {/* {renderGutenbergFooter()} */}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Button */}
          <div className="max-w-4xl mx-auto mb-6">
            <GazeButton
              onClick={() => setIsReading(false)}
              className="flex items-center text-blue-600 hover:text-blue-800"
              whileHover={{ x: -3 }}
            >
              ← Back to Book Info
            </GazeButton>
          </div>
          
          {renderReadingContent()}
        </motion.div>
      )}
    </div>
  );
}