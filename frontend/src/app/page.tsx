// "use client";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import GazeButton from "@/component/gazeButton"; // Nút điều khiển bằng mắt (tuỳ chỉnh riêng)

// export default function HomePage() {
// 	const router = useRouter();

// 	return (
// 		<div className="min-h-screen bg-[#f7faff] flex flex-col justify-center items-center px-6">
// 			<motion.h1
// 				className="text-4xl md:text-5xl font-extrabold text-[#1e293b] mb-12 text-center"
// 				initial={{ opacity: 0, y: -20 }}
// 				animate={{ opacity: 1, y: 0 }}
// 				transition={{ duration: 0.8 }}
// 			>
// 				👁️ Eye tracking
// 			</motion.h1>

// 			<motion.p
// 				className="text-lg md:text-xl text-gray-600 mb-12 text-center max-w-xl"
// 				initial={{ opacity: 0 }}
// 				animate={{ opacity: 1 }}
// 				transition={{ duration: 1 }}
// 			>
// 				Điều khiển máy tính bằng mắt. Chọn một chế độ bên dưới để bắt đầu trải nghiệm:
// 			</motion.p>

// 			<div className="flex flex-col md:flex-row gap-8">
// 				<GazeButton
// 					whileHover={{ scale: 1.1 }}
// 					whileTap={{ scale: 0.95 }}
// 					onClick={() => router.push("/books")}
// 					className="bg-white border border-blue-400 text-blue-700 px-10 py-6 rounded-xl text-2xl font-semibold shadow-md hover:bg-blue-50"
// 				>
// 					📖 Đọc sách
// 				</GazeButton>

// 				<GazeButton
// 					whileHover={{ scale: 1.1 }}
// 					whileTap={{ scale: 0.95 }}
// 					onClick={() => router.push("/needboard")}
// 					className="bg-white border border-pink-400 text-pink-600 px-10 py-6 rounded-xl text-2xl font-semibold shadow-md hover:bg-pink-50"
// 				>
// 					🧠 NeedBoard
// 				</GazeButton>
// 			</div>
// 		</div>
// 	);
// }

"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import GazeButton from "@/component/gazeButton";
import { FaGlobe, FaClipboardList, FaBookOpen, FaCog } from "react-icons/fa";

const options = [
	{
		name: "Lướt Web",
		icon: <FaGlobe className="text-3xl text-green-600" />,
		path: "/WatchVideo",
		borderColor: "border-green-200",
		bgHover: "hover:bg-green-50",
		textColor: "text-green-700",
	},
	{
		name: "Bảng Nhu Cầu",
		icon: <FaClipboardList className="text-3xl text-pink-500" />,
		path: "/needboard",
		borderColor: "border-pink-200",
		bgHover: "hover:bg-pink-50",
		textColor: "text-pink-400",
	},
	{
		name: "Đọc Truyện",
		icon: <FaBookOpen className="text-3xl text-blue-500" />,
		path: "/books",
		borderColor: "border-blue-200",
		bgHover: "hover:bg-blue-50",
		textColor: "text-blue-700",
	},
	{
		name: "Cài Đặt",
		icon: <FaCog className="text-3xl text-gray-500" />,
		path: "/settings",
		borderColor: "border-gray-200",
		bgHover: "hover:bg-gray-100",
		textColor: "text-gray-700",
	},
];

export default function HomePage() {
	const router = useRouter();

	return (
		<div className="min-h-screen bg-[#f7faff] flex flex-col justify-center items-center px-6">
			<motion.h1
				className="text-4xl md:text-5xl font-extrabold text-[#1e293b] mb-10 text-center"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				👁️ Eye Tracking
			</motion.h1>

			<motion.p
				className="text-2xl md:text-xl text-gray-600 mb-4 text-center max-w-xl"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
			>
				Hỗ trợ điều khiển máy tính bằng mắt.
				
			</motion.p>
			<motion.p
				className="text-2xl md:text-xl text-gray-600 mb-12 text-center max-w-xl"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
			>
				
				Chọn một chế độ bên dưới để bắt đầu trải nghiệm:
			</motion.p>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
				{options.map((option, index) => (
					<GazeButton
						key={index}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => router.push(option.path)}
						className={`flex items-center gap-4 bg-white ${option.borderColor} ${option.bgHover} ${option.textColor}
              border-2 px-10 py-10 rounded-2xl shadow-md transition-all duration-300 text-left`}
					>
						{option.icon}
						<span className="text-2xl font-semibold">{option.name}</span>
					</GazeButton>
				))}
			</div>
		</div>
	);
}
