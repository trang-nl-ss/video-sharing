import { Box } from "@chakra-ui/react";
import { Video } from "../type";
import { useVideoList } from "./hook";
import { VideoWidget } from "./VideoWidget";

export const HomePage: React.FunctionComponent = () => {
  const videos = useVideoList();
  return (
    <Box pt={10} px={20}>
      {videos.map((item: Video) => (
        <VideoWidget key={item.id} video={item} />
      ))}
    </Box>
  );
};
