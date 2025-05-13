import axios from "axios";

const KEY = "AIzaSyCTXMbVAAFr8muCvl77GUjIdzRB7f8qdBE";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=${API_KEY}&type=video",
  params: {
    part: "snippet",
    maxResults: 10,
    key: KEY,
  },
});
