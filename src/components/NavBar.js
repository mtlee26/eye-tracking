import { useRouter } from 'next/router';
import GazeButton from "@/components/gazeButton";

const Navbar = () => {
    const router = useRouter();
    const targetUrl = {
      home: "/dashboard",
      quiz: "/quiz",
      reading: "/booksPage",
      game: "/game",
    };

    const handleNavigation = (page) => {
      router.push(targetUrl[page]);
    };
    
    return (
      <div className="absolute top-0 left-0 right-0 z-10 backdrop-blur-sm bg-white bg-opacity-30">
        <nav className="flex justify-between items-center w-full max-w-6xl mx-auto py-6 px-4 h-20">
          <div className="text-2xl font-bold">
            Eyetertainment
          </div>

          <ul className="hidden md:flex space-x-10">
            <GazeButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer bg-[#bfc6dc] text-[#293041] text-lg px-6 py-5 w-40 text-center hover:bg-[#3f4759] hover:text-[#dbe2f9] transition-all rounded-lg" 
                onClick={() => handleNavigation('home')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>

            </GazeButton>

            <GazeButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer bg-[#bfc6dc] text-[#293041] text-lg px-6 py-5 w-40 text-center hover:bg-[#3f4759] hover:text-[#dbe2f9] transition-all rounded-lg" 
                onClick={() => handleNavigation('reading')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" 
                />
                </svg>
            </GazeButton>

            <GazeButton 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer bg-[#bfc6dc] text-[#293041] text-lg px-6 py-5 w-40 text-center hover:bg-[#3f4759] hover:text-[#dbe2f9] transition-all rounded-lg" 
                onClick={() => handleNavigation('game')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" 
                />
                </svg>
            </GazeButton>

            <GazeButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer bg-[#bfc6dc] text-[#293041] text-lg px-6 py-5 w-40 text-center hover:bg-[#3f4759] hover:text-[#dbe2f9] transition-all rounded-lg" 
                onClick={() => handleNavigation('quiz')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" 
                />
              </svg>
            </GazeButton>
          </ul>
        </nav>
      </div>
    );
  };
  
  export default Navbar;