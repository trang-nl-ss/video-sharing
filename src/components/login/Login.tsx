import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, FormControl, Input, Flex } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useToast } from "../../shared";
import { SignInPayload } from "../../auth/auth.type";
import { useAuth } from "../../auth/AuthProvider";

export const Login = () => {
  const auth = useAuth();
  const { newToast } = useToast();
  const { register, handleSubmit, formState } = useForm<SignInPayload>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SignInPayload> = async (payload) => {
    try {
      await auth.signIn(payload);
    } catch (err: any) {
      newToast({
        title: err.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex gap={2}>
        <FormControl>
          <Input
            placeholder="Email"
            type="email"
            {...register("email", { required: true })}
          />
        </FormControl>
        <FormControl>
          <Input
            {...register("password", { required: true, maxLength: 32 })}
            placeholder="Password"
            type="password"
          />
        </FormControl>
        <Box>
          <Button
            type="submit"
            colorScheme="teal"
            isDisabled={!formState.isValid}
            width={150}
          >
            Login/Register
          </Button>
        </Box>
      </Flex>
    </form>
  );
};
