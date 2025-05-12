import { useEffect, useState } from "react";
import axios from "axios";
import BooksList from "@/components/booksList";

export const metadata = {
  title: 'Reading | Eyetertainment',
};

export default function BooksPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const booksPerPage = 4;
  const [books, setBooks] = useState([]);

  useEffect(() => {
    document.title = metadata.title;
    // resumeWebGazer();
    fetchBooks();
    // return () => pauseWebGazer();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "https://otruyenapi.com/v1/api/danh-sach/hoan-thanh?page=1",
        {
          headers: { Accept: "application/json" },
        }
      );
      setBooks(response.data?.data?.items || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const goToNext = () => {
    if (currentIndex + booksPerPage < books.length) {
      setCurrentIndex(currentIndex + booksPerPage);
    }
  };

  const goToPrevious = () => {
    if (currentIndex - booksPerPage >= 0) {
      setCurrentIndex(currentIndex - booksPerPage);
    }
  };

  return (
    <BooksList
      books={books}
      currentIndex={currentIndex}
      goToNext={goToNext}
      goToPrevious={goToPrevious}
    >
      {/* content */}
    </BooksList>
  );
}
