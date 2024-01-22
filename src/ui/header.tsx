import * as React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export const Header: React.FC = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="teal.500"
      color="white"
      backgroundColor={"#FF0000"}
      {...props}
      display={"flex"}
      position={"sticky"}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          PokeApp
        </Heading>
      </Flex>

      <Box
        display={{ base: "block", md: "none" }}
        cursor={"pointer"}
        onClick={handleToggle}
      >
        <HamburgerIcon height={20} width={30} />
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <Text>Docs</Text>
        <Text>Examples</Text>
        <Text>Blog</Text>
      </Stack>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        ml={{ base: -5, md: 4 }}
        mt={{ base: 4, md: 0 }}
      >
        <Button
          colorScheme={"#FF0000"}
          size={"lg"}
          _hover={{ bg: "#D50000", borderColor: "black" }}
        >
          About
        </Button>
      </Box>
    </Flex>
  );
};
