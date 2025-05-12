import { useState } from "react";
import Card from "@/components/gameCard";
import DinoGame from "@/components/dinoGame";
import FlappyBird from "@/components/flappyBirdGame";
import Menja from "@/components/menjaGame";
import styles from "@/styles/game.module.css";
import RootLayout from "@/layouts/rootLayout";
import { useEffect } from "react";
import GazeButton from "@/components/gazeButton";
import MainLayout from "@/components/mainLayout";

export const metadata = {
  title: "Game | Eyetertainment",
};

const Game = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    document.title = metadata.title;
  }, []);

  const customButtonProps = {
    left: {
      // onClick: () => handleOnClickBack(),
      className: "hidden",
      icon: null,
    },
    // bottom: {
    //   className: "hidden",
    //   icon: null,
    // },
    // top: {
    //   className: "hidden",
    //   icon: null,
    // },
    right: {
      className: "hidden",
      icon: null,
    },
  };

  const renderGame = () => {
    if (selectedGame === "Dino")
      return (
        <div className={styles.gameContainer}>
          <DinoGame />
        </div>
      );
    if (selectedGame === "Flappy")
      return (
        <div className={styles.gameContainer}>
          <FlappyBird />
        </div>
      );
    if (selectedGame === "Menja")
      return (
        <div className={styles.gameContainer}>
          <Menja />
        </div>
      );
    return <div>Click a game to play!</div>;
  };

  const renderCard = () => {
    return (
      <div className={styles.listContainer}>
        <Card
          image="./images/dinor_icon.png"
          title="Dinosaur Game (2014)"
          author="Sebastien Gabriel, Alan Bettes, Edward Jung"
          genre="Endless running game"
          action="Play"
          gradient="from-orange-200 via-orange-400 to-orange-600"
          onClick={() => {
            setSelectedGame("Dino");
          }}
        />
        <Card
          image="./images/flappy_bird_icon.jpg"
          title="Flappy Bird (2013)"
          author="Dong Nguyen"
          genre="Arcade"
          action="Play"
          gradient="from-cyan-400 via-cyan-600 to-cyan-800"
          onClick={() => {
            setSelectedGame("Flappy");
          }}
        />
        <Card
          image="./images/menja_icon.png"
          title="Menja (2023)"
          author="Ark Platforms"
          genre="Arcade"
          action="Play"
          gradient="from-gray-300 via-gray-500 to-gray-700"
          onClick={() => {
            setSelectedGame("Menja");
          }}
        />
      </div>
    );
  };

  const handleOnClickBack = () => {
    if (selectedGame) {
      setSelectedGame(null);
    }
  };

  return (
    <MainLayout>
    {/* <RootLayout buttonProps={customButtonProps}> */}
      <div className={styles.container}>
        {!selectedGame && (
          <div className={styles.titleContainer} style={{ marginTop: "80px" }}>Game World</div>
        )}
        {(selectedGame && renderGame()) || renderCard()}
      </div>
    </MainLayout>
  );
};

export default Game;
