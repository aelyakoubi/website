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
        gridTemplateRows={"auto 1fr auto"}
        gridTemplateColumns={"1fr"}
        h="100%"
        gap={4}
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem area={"header"}>
          <Navigation />
        </GridItem>

        <GridItem area={"main"}>
          <Outlet />
        </GridItem>

        <GridItem area={"footer"}>
          <Footer />
        </GridItem>
      </Grid>
    </Box>
  );
};
