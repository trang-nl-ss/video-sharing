import { useEffect, useState } from "react";
import { VideoService } from "../../services";
import { Video } from "../type";

export const useVideoList = () => {
    const [videos, setVideos] = useState<Array<Video>>([])
  
    useEffect(() => {
      const fetchData = async () => {
        const { data } = await VideoService.getVideos();
        setVideos(data?.data)
      };
      fetchData()
    }, []);
    return videos
};