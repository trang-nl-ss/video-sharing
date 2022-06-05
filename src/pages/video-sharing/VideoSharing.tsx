import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Button,
  Flex,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../auth";
import { VideoService } from "../../services";
import { useToast } from "../../shared";
import { ShareVideoPayload } from "../type";

interface PreShareVideoPayload {
  url: string;
}

export const VideoSharing = () => {
  const { watch, register, handleSubmit, formState } =
    useForm<PreShareVideoPayload>({
      mode: "onChange",
      defaultValues: { url: "" },
    });

  const { url } = watch();
  const { newToast } = useToast();
  const auth = useAuth();

  const onSubmit: SubmitHandler<PreShareVideoPayload> = async (payload) => {
    try {
      const { data } = await VideoService.getVideoInfomation(payload.url);

      const shareVideoPayload: ShareVideoPayload = {
        url: url,
        title: data?.title,
        description: data?.author_name,
        creator: auth.tokenPayload?.email || "",
      };

      await VideoService.shareVideo(shareVideoPayload);
      newToast({
        title: "Share video sucess!",
        status: "success",
      });
    } catch (err) {
      newToast({
        title: "Share video fail!",
      });
    }
  };

  return (
    <Flex alignItems="center" pt={150} flexDirection="column">
      <Box width="70%">
        <fieldset>
          <legend
            style={{
              fontWeight: 600,
              marginLeft: 20,
              fontSize: 20,
            }}
          >
            Share a youtube movie
          </legend>
          <Box p={20}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl display="flex" alignItems="flex-end" mb={5}>
                <FormLabel width={150} htmlFor="url">
                  Youtube URL
                </FormLabel>
                <Input
                  id="url"
                  placeholder="Enter URL"
                  {...register("url", { required: true })}
                />
              </FormControl>
              <Box pl={135}>
                <Button
                  width="100%"
                  type="submit"
                  colorScheme="teal"
                  isDisabled={!formState.isValid}
                >
                  Share
                </Button>
              </Box>
            </form>
          </Box>
        </fieldset>
      </Box>
    </Flex>
  );
};
