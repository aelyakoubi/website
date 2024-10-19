import React, { useState } from "react";
import {
  Box,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Checkbox,
  Button,
  Divider,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { PasswordField } from "../FrontLogin/PasswordField";
import { OAuthButtonGroup } from "../FrontLogin/OAuthButtonGroup";
import { handleLogin } from "../FrontLogin/AuthUtils"; // Import your handleLogin
import { useNavigate } from "react-router-dom";

export const LoginModal = ({ closeModal }) => {
  const [identifier, setIdentifier] = useState(""); // Use identifier for either username or email
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  const handleLoginClick = () => {
    handleLogin(identifier, password, closeModal, setError); // Pass setError to handleLogin
  };

  return (
    <Stack spacing="2">
      {error && <Text color="red.500" textAlign="center">{error}</Text>} {/* Display error message */}
      <Text color="black.900" textAlign="center" fontSize={17}>
        Don't have an account? <Link as={RouterLink} to="/signup">Sign up</Link>
      </Text>
      <Box
        py={{ base: "0", sm: "8" }}
        px={{ base: "4", sm: "10" }}
        bg={{ base: "transparent", sm: "white" }}
        boxShadow={{ base: "none", sm: "md" }}
        borderRadius={{ base: "none", sm: "ml" }}
        mt="6"
      >
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl>
              <FormLabel htmlFor="identifier">Username or Email</FormLabel>
              <Input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </FormControl>
            <PasswordField
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Stack>
          <HStack justify="space-between">
            <Checkbox defaultChecked>Remember me</Checkbox>
            <Button variant="link" size="sm">Forgot password?</Button>
          </HStack>
          <Stack spacing="6">
            <Button onClick={handleLoginClick}>Log in</Button>
            <HStack>
              <Divider />
              <Text textStyle="sm" whiteSpace="nowrap" color="gray.500">or continue with</Text>
              <Divider />
            </HStack>
            <OAuthButtonGroup />
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
