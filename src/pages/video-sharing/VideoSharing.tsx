import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Button,
  Flex,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "../../shared";
import { ShareVideoPayload } from "../type";

const defaultPayload: ShareVideoPayload = {
  url: "",
};

export const VideoSharing = () => {
  const { register, handleSubmit, formState } = useForm<ShareVideoPayload>({
    mode: "onChange",
    defaultValues: defaultPayload,
  });
  const { newToast } = useToast();

  const onSubmit: SubmitHandler<ShareVideoPayload> = async (payload) => {
    console.log(payload);
    try {
      // await auth.signIn(payload);
      // navigate(from, { replace: true });
    } catch (err: any) {
      newToast({
        title: err.message,
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
