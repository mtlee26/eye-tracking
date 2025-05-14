//  // src/component/API/Youtobe_Api.tsx
// import axios from "axios";

// // const KEY = "AIzaSyCTXMbVAAFr8muCvl77GUjIdzRB7f8qdBE";
// const API_KEY = "AIzaSyBOFUcW7CR8Go_Q0Yls0auFN97RwTQxPv0"; 

// export default axios.create({
//   baseURL: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=${API_KEY}&type=video",
//   params: {
//     part: "snippet",
//     maxResults: 10,
//     key: API_KEY,
//   },
// });
// src/component/API/Youtube_Api.ts
// import axios from "axios";

// const API_KEY = "AIzaSyBOFUcW7CR8Go_Q0Yls0auFN97RwTQxPv0";

// const youtube = axios.create({
//   baseURL: "https://www.googleapis.com/youtube/v3",
//   params: {
//     part: "snippet",
//     maxResults: 10,
//     key: API_KEY,
//     type: "video",
//   },
// });

// export default youtube;
// src/app/api/search/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  const API_KEY = process.env.YOUTUBE_API_KEY;
  const res = await axios.get("https://www.googleapis.com/youtube/v3/search", {
    params: {
      part: "snippet",
      maxResults: 10,
      q: query,
      key: API_KEY,
      type: "video",
    },
  });

  return NextResponse.json(res.data.items);
}

