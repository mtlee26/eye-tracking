import styles from "@/styles/game.module.css";
const Menja = () => {
  return (
    <iframe
      src="/games/menja/index.html"
      className={styles.iframeGame}
      title="My iframe example"
    />
  );
};

export default Menja;
