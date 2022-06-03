import {
  Avatar,
  Box,
  Flex,
  HStack,
  Spacer,
  Stack,
  Text,
  Heading,
  Button,
} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth";

export const PageLayout: React.FunctionComponent = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <Box>
      <Flex height="100vh" width={{ base: "full", sm: "xs" }} px={6} py={8}>
        <Box mb={8}>
          <Heading size="lg">Funny Movies</Heading>
        </Box>
        <Spacer />
      </Flex>
      <Box flex="1">
        <Outlet />
      </Box>
    </Box>
  );
};
