import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Box, Flex } from "@chakra-ui/react";
import Navigation from "../components/Navigation";

export const Root = () => {
  return (
    <Flex direction="column" w="100vw" minH="100vh">
      <Box as="header">
        <Navigation />
      </Box>

      <Box as="main" flex="1" mt={4}> {/* Allow main content to grow */}
        <Outlet />
      </Box>

      <Box as="footer">
        <Footer />
      </Box>
    </Flex>
  );
};
