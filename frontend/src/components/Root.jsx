import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import LogoutTimer from "./LogoutTimer"; // Import LogoutTimer component

export const Root = () => {
  return (
    <Box>
      <Grid
        templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={"10px 1fr 10px"}
        gridTemplateColumns={"20px 1fr"}
        h="200px"
        gap={1}
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" bg="none" area={"header"}></GridItem>

        <GridItem pl="2" bg="none" area={"nav"}></GridItem>

        <GridItem pl="2" bg="none" area={"main"}>
          <Navigation />
          <Outlet/>
        </GridItem>
        <GridItem pl="2" bg="none" area={"footer"} mb={1200}></GridItem>
      </Grid>
    </Box>
  );
};
