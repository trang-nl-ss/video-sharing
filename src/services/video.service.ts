import { HttpClient, HttpResponse } from "../lib/http";
import { ShareVideoPayload, Video, VideoInformation, VoteVideoPayload } from "../pages/type";
import { BaseHttpClient, BaseResponse } from "./base.service";

const noembedUrl=  import.meta.env.VITE_NOEMBED_URL || "https://noembed.com"
const httpClient  = new HttpClient({
  baseUrl: noembedUrl
});

export const VideoService = {
  async getVideos(): Promise<HttpResponse<BaseResponse<Array<Video>>>> {
    return BaseHttpClient.get("/video");
  },

  async shareVideo(payload?: ShareVideoPayload) {
    return BaseHttpClient.post("/video", payload);
  },

  async getVideoInfomation(youtubeUrl: string): Promise<HttpResponse<VideoInformation>> {
    return httpClient.get("/embed", { url: youtubeUrl });
  },

  async getVotedVideo(id: string): Promise<HttpResponse<VideoInformation>> {
    return BaseHttpClient.get("/voted-video", { id });
  },

  async voteVideo(payload?: VoteVideoPayload) {
    return BaseHttpClient.post("/video/vote-video", payload);
  },
};
