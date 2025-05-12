import { GazeDataProvider } from "@/hooks/GazeContext";
import "@/styles/global.css";

// function MyApp({ Component, pageProps }) {
// return (
// <WebGazerWrapper>
// <Component {...pageProps} />
// </WebGazerWrapper>
// );
// }

function MyApp({ Component, pageProps }) {
  return (
    // <GazeDataProvider>
    <Component {...pageProps} />
    //{" "}
    // </GazeDataProvider>
  );
}

export default MyApp;
