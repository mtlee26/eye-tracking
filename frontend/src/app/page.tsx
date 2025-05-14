"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import GazeButton from "@/component/button/gazeButton"; // Nút điều khiển bằng mắt (tuỳ chỉnh riêng)

export default function HomePage() {
	const router = useRouter();

	return (
		<div className="min-h-screen bg-[#f7faff] flex flex-col justify-center items-center px-6">
			<motion.h1
				className="text-4xl md:text-5xl font-extrabold text-[#1e293b] mb-12 text-center"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				👁️ Eye tracking
			</motion.h1>

			<motion.p
				className="text-lg md:text-xl text-gray-600 mb-12 text-center max-w-xl"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
			>
				Điều khiển máy tính bằng mắt. Chọn một chế độ bên dưới để bắt đầu trải nghiệm:
			</motion.p>

			<div className="flex flex-col md:flex-row gap-8">
				<GazeButton
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => router.push("/books")}
					className="bg-white border border-blue-400 text-blue-700 px-10 py-6 rounded-xl text-2xl font-semibold shadow-md hover:bg-blue-50"
				>
					📖 Đọc sách
				</GazeButton>

				<GazeButton
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => router.push("/needboard")}
					className="bg-white border border-pink-400 text-pink-600 px-10 py-6 rounded-xl text-2xl font-semibold shadow-md hover:bg-pink-50"
				>
					🧠 NeedBoard
				</GazeButton>
			</div>
		</div>
	);
}
