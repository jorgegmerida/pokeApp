import Head from "next/head";
import axios from "axios";
import {
  Container,
  Stack,
  Button,
  SimpleGrid,
  Flex,
  Box,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { PokemonCard, PokemonData } from "@/components";
import { Pokemon } from "@/models";
import ReactPaginate from "react-paginate";

export default function Home() {
  const pokemonDataModal = useDisclosure();

  const [isLoading, setIsLoading] = React.useState(false);

  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);

  const [selectedPokemon, setSelectedPokemon] = React.useState<Pokemon>();

  const [pokeOffset, setPokeOffset] = React.useState(0);

  const [itemOffset, setItemOffset] = React.useState(0);

  const [currentItems, setCurrentItems] = React.useState<Pokemon[]>();

  const [pageCount, setPageCount] = React.useState(0);

  React.useEffect(() => {
    const endOffset = itemOffset + 4;
    setCurrentItems(pokemons.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(pokemons.length / 4));
  }, [itemOffset, pokemons]);

  React.useEffect(() => {
    async function getPokemon() {
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${pokeOffset}`
        );
        if (res.data?.results!.length === 0) {
          console.error("No hay datos");
        } else {
          const promises = res.data?.results.map((result) => axios(result.url));
          const fetchedPokemon = (await Promise.all(promises)).map(
            (res) => res.data
          );

          setPokemons((prev) => [...prev, ...fetchedPokemon]);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getPokemon();
  }, [pokeOffset]);

  const handleNextPage = () => {
    setPokeOffset((prev) => prev + 20);
    setIsLoading(!isLoading);
  };

  const handleViewPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
    pokemonDataModal.onOpen();
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 4) % pokemons.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Head>
        <title>Pokemon Challenge</title>
        <meta
          name="description"
          content="Se listan todos los Pokémon y su información al clickear sobre ellos. También la app mostrará los Pokémon capturados"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Text
        fontSize={"xx-large"}
        justifyContent={"center"}
        textAlign={"center"}
        fontWeight={"bold"}
        marginTop={{ base: "20px" }}
      >
        Pokemons List
      </Text>
      <Flex alignItems="center" minH="100vh" justifyContent="center">
        <Container>
          <Stack
            p="0"
            alignItems="center"
            spacing="0"
            justifyContent={"center"}
            alignContent={"center"}
            textAlign={"center"}
            justifyItems={"center"}
            direction={{ base: "column" }}
          >
            <SimpleGrid
              spacingX={{ md: "440px" }}
              spacingY="20px"
              columns={{ base: 1, sm: 1, md: 4 }}
              justifyContent={"space-between"}
              marginTop={{ base: "40px", md: "-220px" }}
              marginRight={{ md: "300px" }}
            >
              {currentItems?.map((pokemon: Pokemon, index: number) => (
                <Box
                  as="button"
                  key={index}
                  onClick={() => handleViewPokemon(pokemon)}
                >
                  <PokemonCard {...pokemon} />
                </Box>
              ))}
            </SimpleGrid>
            <Box
              width={{ base: 300, md: "100vw" }}
              marginLeft={{ base: "10px", md: "300px" }}
              marginTop={{ base: "50px" }}
              marginRight={{ md: "300px" }}
            >
              <ReactPaginate
                breakLinkClassName={"break-me"}
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={10}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName={"pagination"}
              />
            </Box>

            <Button
              width={{ base: "70%" }}
              isLoading={isLoading}
              onClick={handleNextPage}
              display={"flex"}
              marginTop={{ base: "20px" }}
              marginBottom={{ base: 10 }}
              color={"#E2E2E2"}
              colorScheme={"#E2E2E2"}
              backgroundColor={"#FF0000"}
              _hover={{ bg: "#C30010", borderColor: "black" }}
              borderRadius={"xl"}
            >
              Cargas más
            </Button>
          </Stack>
        </Container>
      </Flex>
      <Modal {...pokemonDataModal} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent
          width={{ base: "auto", md: "100%" }}
          minHeight={{ base: "400px", md: "635px" }}
        >
          <ModalHeader textTransform="capitalize">
            {selectedPokemon && selectedPokemon.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedPokemon && <PokemonData {...selectedPokemon} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
