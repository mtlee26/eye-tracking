import BooksList from "@/components/booksList";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export const metadata = {
  title: 'Search Book | Eyetertainment',
};


const Search = () => {
    const router = useRouter();
    const { keyword } = router.query;
    const [books, setBooks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [message, setMessage] = useState('');

    useEffect(() => {
      document.title = metadata.title;
    }, []);

  useEffect(() => {
    if (keyword) {
      fetchSearchResults(keyword);
    }
  }, [keyword]);

  const fetchSearchResults = async (keyword) => {
    try {
      const response = await axios.get(`https://otruyenapi.com/v1/api/tim-kiem?keyword=${keyword}`, {
        headers: { 'Accept': 'application/json' }
      });
      if (response.data?.data?.items.length > 0) {
        setBooks(response.data?.data?.items);
        setMessage('');
      } else {
        setMessage('No results found.');
        setBooks([]);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const goToNext = () => {
    if (currentIndex + 4 < books.length) {
      setCurrentIndex(currentIndex + 4);
    }
  };

  const goToPrevious = () => {
    if (currentIndex - 4 >= 0) {
      setCurrentIndex(currentIndex - 4);
    }
  };

  return (
    <BooksList books={books} currentIndex={currentIndex} goToNext={goToNext} goToPrevious={goToPrevious} message={message}>
      {/* content */}
    </BooksList>
  );
};

export default Search;
