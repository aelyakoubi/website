import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Footer } from "../components/Footer";
import { Box, Grid, GridItem } from "@chakra-ui/react";


export const Root = () => {
  return (
    <Box w="100vw" minH="100vh">
      <Grid
        templateAreas={`"header header"
                        "main main"
                        "footer footer"`}
        gridTemplateRows={"auto 1fr auto"} // "1fr" ensures main section grows to fill available space
        gridTemplateColumns={"1fr"}
        h="100%"
        gap={4}
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem area={"header"}>
          <Navigation />
        </GridItem>

        <GridItem area={"main"} minH="70vh"> {/* Ensure minimum height for the main content */}
          <Outlet />
        </GridItem>

        <GridItem area={"footer"} position="absolute" bottom="0"> {/* Sticky footer */}
          <Footer />
        </GridItem>
      </Grid>
    </Box>
  );
};
