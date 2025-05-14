 // src/component/API/Youtobe_Api.tsx
import axios from "axios";

// const KEY = "AIzaSyCTXMbVAAFr8muCvl77GUjIdzRB7f8qdBE";
const API_KEY = "AIzaSyBOFUcW7CR8Go_Q0Yls0auFN97RwTQxPv0"; 
export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=${API_KEY}&type=video",
  });
// export default axios.create({
//   baseURL: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=${API_KEY}&type=video",
//   params: {
//     part: "snippet",
//     maxResults: 10,
//     key: KEY,
//   },
// });
