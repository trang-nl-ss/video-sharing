import { Heading, Image, Flex, Button, Box } from "@chakra-ui/react";
import { Logo } from "../assets/images";
import { Login, useAuth } from "../auth";

export const Header: React.FunctionComponent = () => {
  const auth = useAuth();
  return (
    <Flex
      width="100%"
      px={40}
      height={100}
      py={15}
      justifyContent="space-between"
      alignItems="flex-end"
      background="white"
      position="fixed"
    >
      <Flex alignItems="flex-end">
        <Image src={Logo} alt="Logo" width={50} mr={1} />
        <Heading size="2xl">Funny Movies</Heading>
      </Flex>
      {auth.isAuthenticated ? (
        <Flex gap={2} alignItems="center">
          <Box mr={3}>Welcome {auth.tokenPayload?.userName}</Box>
          <Button colorScheme="teal" width={140}>
            Share a movie
          </Button>
          <Button colorScheme="teal" width={140}>
            Logout
          </Button>
        </Flex>
      ) : (
        <Login />
      )}
    </Flex>
  );
};
