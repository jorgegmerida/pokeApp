import * as React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useMediaQuery } from "@chakra-ui/react";

export const Header: React.FC = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isMobile] = useMediaQuery("(max-width: 600px)");

  const handleToggle = () => (isOpen ? onClose() : onOpen());

  const router = useRouter();

  const aboutPokemonApp = useDisclosure();

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

      {isMobile ? (
        <>
          <Box
            display={isOpen ? "flex" : "none"}
            position={"absolute"}
            ml={{ base: -5, md: 4 }}
            mt={{ base: 4, md: 0 }}
          >
            <Button
              colorScheme={"#FF0000"}
              size={"lg"}
              _hover={{ bg: "#D50000", borderColor: "black" }}
              onClick={() => aboutPokemonApp.onOpen()}
            >
              About
            </Button>
          </Box>
          <Stack
            direction={{ base: "column" }}
            display={{ base: isOpen ? "block" : "none" }}
            width={{ base: "full", md: "auto" }}
            alignItems="center"
            flexGrow={1}
            mt={{ base: 14 }}
            gap={50}
          >
            <Button
              backgroundColor={"#F2F2F2"}
              _hover={{ bg: "#D2D2D2", borderColor: "black" }}
              onClick={() => {
                if (router.pathname === "/catched") {
                  router.push("/");
                } else {
                  router.push("/catched");
                }
              }}
            >
              {router.pathname === "/catched"
                ? "Go Pokemon Home"
                : "Go Pokemon Catched"}
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Stack
            direction={{ base: "column", md: "row" }}
            display={{ base: isOpen ? "block" : "none", md: "flex" }}
            width={{ base: "full", md: "auto" }}
            alignItems="center"
            flexGrow={1}
            mt={{ base: 4, md: 0 }}
            marginLeft={{ md: "50px" }}
            gap={50}
          >
            <Button
              backgroundColor={"#F2F2F2"}
              _hover={{ bg: "#D2D2D2", borderColor: "black" }}
              onClick={() => {
                if (router.pathname === "/catched") {
                  router.push("/");
                } else {
                  router.push("/catched");
                }
              }}
            >
              {router.pathname === "/catched"
                ? "Go Pokemon Home"
                : "Go Pokemon Catched"}
            </Button>
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
              onClick={() => aboutPokemonApp.onOpen()}
            >
              About
            </Button>
          </Box>
        </>
      )}

      <Modal {...aboutPokemonApp} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent height={"auto"}>
          <ModalHeader textTransform="capitalize">
            <Text fontSize={"xx-large"}>PokeApp version 1.0</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            justifyContent={"center"}
            alignItems={"center"}
            alignContent={"center"}
          >
            <Text
              fontSize={"large"}
              justifyContent={"center"}
              textAlign={"center"}
            >
              El objetivo de la app es listar todos los Pokémon y mostrar
              información de los mismos al clickear sobre ellos. También la app
              mostrará de alguna forma los Pokémon que el usuario tiene
              capturados.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
