"use client";
import { useEffect, useState } from "react";
import BooksList from "@/component/book/booksList";
import GazeButton from "@/component/button/gazeButton";
import { s } from "framer-motion/client";
import Search from "@/component/search";
import { AiOutlineLeft } from "react-icons/ai";

interface Book {
	id: string;
	title: string;
	author?: string;
	coverImage?: string;
	slug: string;
	thumb_url: string;
	name: string;
	chaptersLatest: any;
	category: string; // Added category property
	volumeInfo: {
		categories?: string[];
		[key: string]: any;
	};
}

const DEFAULT_CATEGORIES = [
	"Novel", "Fiction", "Literature",
	"Fantasy", "Mystery", "Romance", "History", "Comics"
];

export default function BooksPage() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [books, setBooks] = useState<Book[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const booksPerPage = 4;
	const [searchQuery, setSearchQuery] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [showKeyboard, setShowKeyboard] = useState(false);


	// Fetch books whenever category changes
	useEffect(() => {
		const fetchBooks = async () => {
			setIsLoading(true);
			try {
				const query = selectedCategory || "Novel";
				if (query === "Comics") {
					const response = await fetch(
						`https://api.mangadex.org/manga?limit=20&order[followedCount]=desc&includes[]=cover_art`
					);
					const data = await response.json();
					console.log(data)

					const processedBooks = data?.data?.map((manga: any) => {
						const id = manga.id;
						const attributes = manga.attributes;
						let title = attributes?.title?.en;
						if (!title) {
							const altEn = attributes?.altTitles?.find((alt: any) => alt?.en);
							title = altEn?.en || "Untitled";
						}

						// Tìm cover ảnh từ relationships
						const coverArt = manga.relationships.find((rel: any) => rel.type === "cover_art");
						const fileName = coverArt?.attributes?.fileName;

						const coverImage = fileName
							? `https://uploads.mangadex.org/covers/${id}/${fileName}.256.jpg`
							: "";

						return {
							id,
							title,
							name: title,
							slug: title,
							author: attributes?.author || "Unknown",
							coverImage,
							thumb_url: coverImage,
							category: "comics",
						};
					}) || [];
					setBooks(processedBooks);
				} else {
					const response = await fetch(
						`https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(query)}&maxResults=40`
					);
					const data = await response.json();
					console.log("Books data:", data);
					const processedBooks = data?.items
						?.filter((item: any) => item.volumeInfo?.imageLinks?.thumbnail)
						.map((item: any) => ({
							id: item.id,
							title: item.volumeInfo?.title || "Untitled",
							author: item.volumeInfo?.authors?.join(", ") || "Unknown",
							coverImage: item.volumeInfo?.imageLinks?.thumbnail,
							slug: item.volumeInfo?.title || "Untitled",
							thumb_url: item.volumeInfo?.imageLinks?.thumbnail,
							name: item.volumeInfo?.title || "Untitled",
							volumeInfo: item.volumeInfo,
							category: query, // Assign the selected category
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

	const handleSearch = async () => {
		console.log(searchQuery)
		setSearchTerm(searchQuery);
		console.log(searchTerm)
		const response = await fetch(
			`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(searchQuery)}&maxResults=40`
		);
		const data = await response.json();
		console.log(data)
		let processedBooks: Book[] = [];
		processedBooks = data?.items?.filter((item: any) => item.volumeInfo?.imageLinks?.thumbnail)
			.map((item: any) => ({
				id: item.id,
				title: item.volumeInfo?.title || "Untitled",
				author: item.volumeInfo?.authors?.join(", ") || "Unknown",
				coverImage: item.volumeInfo?.imageLinks?.thumbnail,
				slug: item.volumeInfo?.title || "Untitled",
				thumb_url: item.volumeInfo?.imageLinks?.thumbnail,
				name: item.volumeInfo?.title || "Untitled",
				volumeInfo: item.volumeInfo,
				category: selectedCategory || "Novel",
			})) || [];

		console.log(processedBooks)

		setBooks(processedBooks);
		setCurrentIndex(0);
	};


	return (
		<div className="container mx-auto px-4 py-8">
			{/* <Search /> */}
			{/* Search Box (gaze vào sẽ mở bàn phím) */}
			<div className="mb-6">
				<label className="block text-white text-xl font-semibold mb-2">
					Search Books
				</label>
				<div className="flex gap-4 items-center">
					<GazeButton
						onClick={() => setShowKeyboard(true)}
						className="flex-1 px-4 py-2 rounded-md bg-[#2c2d34] text-left text-white placeholder-gray-400 text-xl"
					>
						{searchQuery || "Gaze here to search..."}
					</GazeButton>

					<GazeButton
						onClick={() => {
							setSearchTerm(searchQuery);
							setCurrentIndex(0);
						}}
						className="px-4 py-2 rounded-lg bg-gray-600 text-white font-semibold shadow-md"
					>
						Search
					</GazeButton>
				</div>
			</div>

			{showKeyboard && (
				<div className="fixed inset-0 z-50 bg-gray-200 bg-opacity-90 flex flex-col items-center justify-center space-y-4 p-4">
					<div className="absolute top-10 left-10 z-50">
						<GazeButton
							whileHover={{ scale: 1.2 }}
							whileTap={{ scale: 0.9 }}
							onClick={() => setShowKeyboard(false)}

							className={`p-8 rounded-full bg-[#1e1f25] text-white text-3xl shadow-lg transform transition-transform duration-300 hover:scale-110 ${"hover:shadow-xl"
								} active:scale-95`}
						>
							<AiOutlineLeft />
						</GazeButton>
					</div>
					{/* Thanh hiển thị nội dung đã nhập */}
					<div className="w-full max-w-4xl bg-white text-black rounded-md  py-3 text-xl text-left shadow-md mb-16">
						{searchQuery || <span className="text-gray-400">Start typing by looking at keys...</span>}
					</div>
					<div className="grid grid-cols-9 gap-4">
						{"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((char) => (
							<GazeButton
								key={char}
								onClick={() => setSearchQuery((prev) => prev + char)}
								className="w-24 h-24 text-white text-lg bg-[#1e1f25] rounded-md"
							>
								{char}
							</GazeButton>
						))}
					</div>

					{/* Space + Backspace */}
					<div className="flex gap-4 mt-4">
						<GazeButton
							onClick={() => setSearchQuery((prev) => prev + " ")}
							className="w-48 h-24 bg-gray-600 text-white rounded-md text-2xl"
						>
							Space
						</GazeButton>

						<GazeButton
							onClick={() =>
								setSearchQuery((prev) => prev.slice(0, prev.length - 1))
							}
							className="w-48 h-24 bg-gray-600 text-white rounded-md text-2xl"
						>
							Backspace
						</GazeButton>

						<GazeButton
							onClick={() =>
								setSearchQuery('')
							}
							className="w-48 h-24 bg-gray-600 text-white rounded-md text-2xl"
						>
							Delete All
						</GazeButton>

						<GazeButton
							onClick={() => {
								handleSearch();
								setShowKeyboard(false)
							}
							}
							className="w-48 h-24 bg-green-600 text-white rounded-md text-2xl"
						>
							Search
						</GazeButton>
					</div>
				</div>
			)}


			{/* Category Filter */}
			<div className="mb-8">
				<h2 className="text-2xl font-bold mb-4 text-white">Categories</h2>
				<div className="flex flex-wrap gap-8">
					{DEFAULT_CATEGORIES.map((category, index) => (
						<GazeButton
							whileHover={{ scale: 1.2 }}
							whileTap={{ scale: 0.9 }}
							onClick={() => handleCategorySelect(category)}
							key={index}
							className={`p-6 rounded-full bg-[#1e1f25] text-white text-xl shadow-lg transform transition-transform duration-300 hover:scale-110 ${selectedCategory === category
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