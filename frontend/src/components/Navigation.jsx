import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Center, Flex } from "@chakra-ui/react";

export const Navigation = () => {
  const location = useLocation();

  const isEventPage = location.pathname.includes("/event/");

  return (
    <Flex
      gap="1"
      maxW="960px"
      mx="auto"
      sm="30em"
      md="48em"
      lg="62em"
      xl="80em"
      display="flexbox"
      lineHeight={1.9}
      align={"center"}
    >
      <nav>
        <ul>
          <Center>
            {isEventPage && (
              <Button
                bg={"gray.300"}
                letterSpacing={5.5}
                mt={8}
                ml="-1500"
                type="submit"
                borderRadius="15px"
                border="3px solid"
                padding="0.6em 1.2em"
                fontSize="1em"
                fontWeight="500"
                fontFamily="inherit"
                backgroundColor="grey.500"
                cursor="pointer"
                transition="border-color 0.25s, box-shadow 0.25s"
                _hover={{
                  borderColor: "purple",
                  boxShadow: "0 0 8px 2px rgba(128, 78, 254, 0.5)",
                }}
                _focus={{ outline: "4px auto -webkit-focus-ring-color" }}
              >
                <Link to="/"> Home </Link>
              </Button>
            )}
          </Center>
        </ul>
      </nav>
    </Flex>
  );
};