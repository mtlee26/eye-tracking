import styles from "@/styles/game.module.css";

const DinoGame = () => {
  return (
    <iframe
      src="/games/dino/index.html"
      className={styles.iframeGame}
      title="My iframe example"
    />
  );
};

export default DinoGame;
