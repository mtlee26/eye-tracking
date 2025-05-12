import styles from "@/styles/game.module.css";
const FlappyBird = () => {
  return (
    <iframe
      src="/games/flappyBird/index.html"
      className={styles.iframeGame}
      title="My iframe example"
    />
  );
};

export default FlappyBird;
