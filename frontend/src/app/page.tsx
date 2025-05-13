'use client';

import { useEffect, useState } from 'react';
import { fetchBooksFromGoogleBooks, fetchComicsFromAnof } from '@/lib/api';

const genres = [
  { name: 'Novel', source: 'google' },
  { name: 'Vietnamese Literature', source: 'google' },
  { name: 'Action', source: 'anof' },
  { name: 'Romance', source: 'anof' },
];

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedGenre) return;
    const genreInfo = genres.find((g) => g.name === selectedGenre);
    if (!genreInfo) return;

    setLoading(true);
    const fetchData = async () => {
      let result = [];
      if (genreInfo.source === 'google') {
        result = await fetchBooksFromGoogleBooks(genreInfo.name);
      } else {
        result = await fetchComicsFromAnof(genreInfo.name);
	  }
	console.log(result);
      setBooks(result);
      setLoading(false);
    };

    fetchData();
  }, [selectedGenre]);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Thể loại</h1>
      <div className="flex gap-2 flex-wrap">
        {genres.map((genre) => (
          <button
            key={genre.name}
            onClick={() => setSelectedGenre(genre.name)}
            className={`px-4 py-2 rounded-full border ${
              selectedGenre === genre.name ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">
          {selectedGenre ? `Kết quả cho "${selectedGenre}"` : 'Chọn thể loại để xem sách'}
        </h2>
        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {books.map((book) => (
              <div key={book.id} className="border rounded-lg overflow-hidden p-2">
                <img src={book.image} alt={book.title} className="w-full h-40 object-cover mb-2" />
                <p className="text-sm font-medium">{book.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
