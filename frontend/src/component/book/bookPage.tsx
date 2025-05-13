// "use client"
// import { useEffect, useState } from "react";
// import axios from "axios";
// import BooksList from "../booksList";

// interface Book {
//   id: string;
//   title: string;
//   author?: string;
//   coverImage?: string;
//   slug: string;
//   thumb_url: string;
//   name: string;
//   chaptersLatest: any;
//   [key: string]: any;
// }

// interface ApiResponse {
//   data?: {
//     items?: Book[];
//   };
// }

// // export const metadata = {
// //   title: 'Reading | Eyetertainment',
// // };

// export default function BooksPage() {
//   const [currentIndex, setCurrentIndex] = useState<number>(0);
//   const booksPerPage = 4;
//   const [books, setBooks] = useState<Book[]>([]);

//   useEffect(() => {
//     // document.title = metadata.title;
//     fetchBooks();
//     // Cleanup function if needed
//     return () => {
//       // pauseWebGazer();
//     };
//   }, []);

//   const fetchBooks = async (): Promise<void> => {
//     try {
//       const response = await axios.get<ApiResponse>(
//         "https://otruyenapi.com/v1/api/danh-sach/hoan-thanh?page=1",
//         {
//           headers: { Accept: "application/json" },
//         }
//       );
//       setBooks(response.data?.data?.items || []);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const goToNext = (): void => {
//     if (currentIndex + booksPerPage < books.length) {
//       setCurrentIndex(currentIndex + booksPerPage);
//     }
//   };

//   const goToPrevious = (): void => {
//     if (currentIndex - booksPerPage >= 0) {
//       setCurrentIndex(currentIndex - booksPerPage);
//     }
//   };

//   return (
//     <BooksList
//       books={books}
//       currentIndex={currentIndex}
//       goToNext={goToNext}
//       goToPrevious={goToPrevious}
//     />
//   );
// }