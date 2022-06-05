import { Heading, Image, Flex, Button, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../assets/images";
import { useAuth } from "../auth";
import { Login } from "./login/Login";

export const Header: React.FunctionComponent = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    auth.logOut();
    window.location.reload();
  };

  const goToShareVideo = () => {
    navigate("/share");
  };

  const goToHome = () => {
    navigate("/");
  };

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
        <Image src={Logo} alt="Logo" width={70} mr={1} />
        <Heading fontSize={40} onClick={goToHome} cursor="pointer" color="teal">
          Funny Movies
        </Heading>
      </Flex>
      {auth.isAuthenticated ? (
        <Flex gap={2} alignItems="center">
          <Box mr={3}>Welcome {auth.tokenPayload?.email}</Box>
          <Button colorScheme="teal" width={140} onClick={goToShareVideo}>
            Share a movie
          </Button>
          <Button colorScheme="teal" width={140} onClick={handleLogOut}>
            Logout
          </Button>
        </Flex>
      ) : (
        <Login />
      )}
    </Flex>
  );
};
