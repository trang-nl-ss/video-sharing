import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Header } from "../components";

export const PageLayout: React.FunctionComponent = () => {
  return (
    <Box background="#F7F8FB" minHeight="100vh">
      <Header />
      <Box px={40} pt={100} pb={50}>
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
