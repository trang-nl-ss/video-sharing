import { Box } from "@chakra-ui/react";
import { Video } from "../type";
import { data } from "./data";
import { VideoWidget } from "./VideoWidget";

export const HomePage: React.FunctionComponent = () => {
  return (
    <Box pt={10} px={20}>
      {data.map((item: Video) => (
        <VideoWidget key={item.id} video={item} />
      ))}
    </Box>
  );
};
