import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

// const imageMap = {
//   quiz: "/images/quiz.png",
//   reading: "/images/reading.png",
//   game: "/images/game.png",
// };

const imageMap = {
  quiz: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" 
        />
    </svg>

  ),
  reading: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" 
      />
    </svg>

  ),
  game: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" 
      />
    </svg>
  ),
};

const targetUrl = {
  quiz: "/quiz",
  reading: "/booksPage",
  game: "/game",
};

export default function CardWrapper() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 items-stretch justify-center mx-auto">
      <Card title="Quiz" type="quiz" description="Test your knowledge with diverse quizzes across multiple categories"/>
      <Card title="Reading" type="reading" description="Explore an immersive comic book experience with vibrant visuals and thrilling narratives" />
      <Card title="Game" type="game" description="Experience exciting and interactive games tailored for eye-tracking control"/>
    </div>
  );
}

export function Card({ title, type, description }) {
  const imgSrc = imageMap[type];
  const url = targetUrl[type];
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    let timer;
    if (isHovered) {
      let elapsedTime = 0;
      timer = setInterval(() => {
        elapsedTime += 50;
        setProgress((elapsedTime / 1500) * 100);

        if (elapsedTime >= 1500) {
          clearInterval(timer);
          handleHoverActivate();
        }
      }, 50);
    } else {
      clearInterval(timer);
      setProgress(0);
    }

    return () => clearInterval(timer);
  }, [isHovered]);

  const handleHoverActivate = () => {
    router.push(url);
  };

  return (
    <Link
      href={url}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl max-w-md mx-auto flex flex-col h-full">
        {/* Icon SVG */}
        <div className="flex justify-center mb-4">
          {imageMap[type]}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

        {/* Description*/}
        <p className="mt-2 text-sm text-gray-500 flex-grow">{description}</p>

        <div
          style={{
            position: "relative",
            bottom: 0,
            left: 0,
            width: `${progress}%`,
            height: "4px",
            backgroundColor: "#3b82f6",
            transition: "width 0.05s ease-out",
            zIndex: 10,
          }}
        />
      </div>
    </Link>
  );
}
