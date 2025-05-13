// component/GazeScrollButton.tsx
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import GazeButton from "./gazeButton";

export function GazeScrollButton({ direction = "down", amount = 400 }: { direction?: "up" | "down"; amount?: number }) {
	const handleScroll = () => {
		window.scrollBy({
			top: direction === "down" ? amount : -amount,
			behavior: "smooth",
		});
	};

	return (
		<GazeButton
			onClick={handleScroll}
			className="p-10 rounded-full bg-[#1e1f25] text-white text-2xl shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-xl active:scale-95"
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.95 }}
		>
			{direction === "down" ? <AiOutlineDown/> : <AiOutlineUp/>}
		</GazeButton>
	);
}
