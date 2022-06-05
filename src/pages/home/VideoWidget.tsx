import { Box, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/layout";
import {
  AiTwotoneLike,
  AiTwotoneDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import { Video } from "../type";
import { VotedType } from "../../shared/const";
import { useAuth } from "../../auth";
import { VideoService } from "../../services/video.service";
import { useToast } from "../../shared";

interface VideoWidgetProps {
  video: Video;
}
export const VideoWidget: React.FunctionComponent<VideoWidgetProps> = ({
  video,
}) => {
  const auth = useAuth();
  const { newToast } = useToast();

  const handleVoteVideo = async (type: string) => {
    try {
      await VideoService.voteVideo({
        id: video.id,
        voteType: type,
      });
    } catch (err: any) {
      newToast({
        title: err.message,
      });
    }
  };
  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap={10}
      border="1px"
      borderColor="gray.200"
      borderRadius="10px"
      p={5}
      mb={10}
      background="white"
    >
      <GridItem>
        <iframe
          width="640"
          height="360"
          src={video.url.replace("watch?v=", "embed/")}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </GridItem>
      <GridItem>
        <Box>
          <Heading size="lg" color="steelblue" fontWeight="bold">
            {video.title}
          </Heading>
          <Flex alignItems="flex-end" justifyContent="space-between" my={1}>
            <Heading as="h6" size="sm">
              Shared by: {video.creator}
            </Heading>
            {auth.isAuthenticated && (
              <>
                {video.votedType === VotedType.UNKNOWN && (
                  <Flex gap={1}>
                    <AiOutlineLike
                      fontSize={36}
                      cursor="pointer"
                      onClick={() => handleVoteVideo(VotedType.UP)}
                    />
                    <AiOutlineDislike
                      fontSize={36}
                      cursor="pointer"
                      onClick={() => handleVoteVideo(VotedType.DOWN)}
                    />
                  </Flex>
                )}
                {video.votedType === VotedType.UP && (
                  <AiTwotoneLike fontSize={36} />
                )}
                {video.votedType === VotedType.DOWN && (
                  <AiTwotoneDislike fontSize={36} />
                )}
              </>
            )}
          </Flex>

          <Flex gap={1} alignItems="center" mb={2}>
            <Text fontWeight="bold">{video.votedUp}</Text>
            <AiTwotoneLike fontSize={20} />
            <Text fontWeight="bold" ml={2}>
              {video.votedUp}
            </Text>
            <AiTwotoneDislike fontSize={20} />
          </Flex>
          <Text fontWeight="bold">Description:</Text>
          <Text>{video.description}</Text>
        </Box>
      </GridItem>
    </Grid>
  );
};
