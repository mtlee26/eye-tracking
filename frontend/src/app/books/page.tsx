"use client";
import { useEffect, useState } from "react";
import BooksList from "@/component/booksList";
import GazeButton from "@/component/gazeButton";
import { s } from "framer-motion/client";

interface Book {
  id: string;
  title: string;
  author?: string;
  coverImage?: string;
  slug: string;
  thumb_url: string;
  name: string;
  chaptersLatest: any;
  volumeInfo: {
    categories?: string[];
    [key: string]: any;
  };
}

const DEFAULT_CATEGORIES = [
  "Novel", "Fiction", "Literature", "Science Fiction", 
  "Fantasy", "Mystery", "Romance", "History", "Comics", "Manga"
];

export default function BooksPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>("Novel");
  const [isLoading, setIsLoading] = useState(true);
  const booksPerPage = 4;

  // Fetch books whenever category changes
  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
		try {
			const query = selectedCategory || "Novel";
			if (query === "Comics") {
				const response = await fetch(
					`https://otruyenapi.com/v1/api/danh-sach/hoan-thanh?page=1`,
					{
						headers: { Accept: "application/json" },
					}
				);
				const data = await response.json();
				const processedBooks = data?.data?.items?.map((book: { thumb_url: any; }) => ({
					...book,
					thumb_url: `https://otruyenapi.com/uploads/comics/${book.thumb_url}`
				  })) || [];
				console.log("Comics data:", processedBooks);
				setBooks(processedBooks);
			} else {
				const response = await fetch(
					`https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(query)}&maxResults=40`
				);
				const data = await response.json();

				const processedBooks = data?.items
					?.filter((item: any) => item.volumeInfo?.imageLinks?.thumbnail)
					.map((item: any) => ({
						id: item.id,
						title: item.volumeInfo?.title || "Untitled",
						author: item.volumeInfo?.authors?.join(", ") || "Unknown",
						coverImage: item.volumeInfo?.imageLinks?.thumbnail,
						slug: item.slug,
						thumb_url: item.volumeInfo?.imageLinks?.thumbnail,
						name: item.volumeInfo?.title || "Untitled",
						chaptersLatest: item.volumeInfo?.pageCount || 0,
						volumeInfo: item.volumeInfo
					})) || [];

				setBooks(processedBooks);
			}
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [selectedCategory]); // Chỉ chạy khi selectedCategory thay đổi

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(prev => prev === category ? null : category);
    setCurrentIndex(0); // Reset pagination khi đổi category
  };

  // Pagination controls
  const goToNext = () => {
    if (currentIndex + booksPerPage < books.length) {
      setCurrentIndex(prev => prev + booksPerPage);
    }
  };

  const goToPrevious = () => {
    if (currentIndex - booksPerPage >= 0) {
      setCurrentIndex(prev => prev - booksPerPage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Filter */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Categories</h2>
        <div className="flex flex-wrap gap-8">
				  {DEFAULT_CATEGORIES.map(category => (
			  <GazeButton
							  whileHover={{ scale: 1.2 }}
							  whileTap={{ scale: 0.9 }}
							  onClick={() => handleCategorySelect(category)}
							  className={`p-6 rounded-full bg-[#1e1f25] text-white text-xl shadow-lg transform transition-transform duration-300 hover:scale-110 ${
								selectedCategory === category
								  ? "hover:shadow-xl"
								  : "opacity-70"
						    } active:scale-95`}
							>
							  {category}
							</GazeButton>
          ))}
        </div>
      </div>

      {/* Results Info */}
      <div className="text-gray-300">
        {isLoading ? (
          "Loading books..."
        ) : (
          `Showing ${Math.min(currentIndex + booksPerPage, books.length)} of ${books.length} 
          ${selectedCategory ? `${selectedCategory} ` : ""}books`
        )}
      </div>

	         {/* Books List */}
       {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <BooksList
          books={books}
           currentIndex={currentIndex}
           goToNext={goToNext}
          goToPrevious={goToPrevious}
         />
      )}
    </div>
  );
}