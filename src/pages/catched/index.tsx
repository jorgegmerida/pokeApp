import { PokemonData } from "@/components";
import { Pokemon } from "@/models";
import {
  Box,
  AspectRatio,
  Image,
  Stack,
  SimpleGrid,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Progress,
  Text,
  Tab,
  Badge,
  HStack,
  Checkbox,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import * as React from "react";

interface Props {}

const Catched: React.FC<Props> = () => {
  const [pokemonCatched, setPokemonCatched] = React.useState<Pokemon[]>([]);

  const [selectedPokemon, setSelectedPokemon] = React.useState<Pokemon>();

  const [showData, setShowData] = React.useState(false);

  const [deletePokemon, setDeletePokemon] = React.useState(false);

  const pokemonDataModal = useDisclosure();

  React.useEffect(() => {
    const getCatchedPokemon = async () => {
      try {
        const res = await axios.get("/api/catched");
        if (res.status === 200) {
          setPokemonCatched(res.data);
          setShowData(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCatchedPokemon();
  }, [deletePokemon]);

  const handleFreePokemon = async (pokemonId: number) => {
    try {
      const res = await axios.delete(`/api/catched/${pokemonId}`);
      if (res.status === 200) {
        setDeletePokemon(!deletePokemon);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    pokemonDataModal.onOpen();
  };

  return (
    showData && (
      <>
        <SimpleGrid
          spacingY="20px"
          columns={{ base: 1, sm: 1, md: 2, xl: 3, lg: 3 }}
          justifyContent={"center"}
          alignContent={"center"}
          alignItems={"center"}
          margin={"50px 50px"}
        >
          {pokemonCatched?.map((pokemon: Pokemon, index: number) => (
            <>
              <Stack
                direction={"column"}
                key={index}
                boxShadow="xl"
                p="5"
                borderRadius="xl"
                alignItems="center"
                width={{ xs: 200, md: 500 }}
                marginBottom={"50px"}
                cursor={"pointer"}
              >
                <Stack
                  spacing="5"
                  pb="5"
                  width={"100%"}
                  onClick={() => handleViewPokemon(pokemon)}
                  backgroundColor={"#E3E4E5"}
                  borderRadius="xl"
                >
                  <Stack
                    spacing="5"
                    position="relative"
                    justifyContent={"center"}
                    alignContent={"center"}
                    alignItems={"center"}
                    textAlign={"center"}
                    direction={{ base: "column", md: "row" }}
                  >
                    <AspectRatio
                      width={{ base: "200px", md: "300px" }}
                      ratio={1}
                      height={"full"}
                    >
                      <Image
                        objectFit="contain"
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
                        alt="pokemon"
                      />
                    </AspectRatio>
                    <Stack display={"flex"} direction={"column"} spacing="5">
                      <Stack direction={"row"}>
                        <Text fontSize={{ sm: "small", md: "large" }}>
                          Weight :{" "}
                        </Text>
                        <Text fontSize={{ sm: "small", md: "large" }}>
                          {pokemon.weight}
                        </Text>
                      </Stack>
                      <Stack direction={"row"}>
                        <Text fontSize={{ sm: "small", md: "large" }}>
                          Height :{" "}
                        </Text>
                        <Text fontSize={{ sm: "small", md: "large" }}>
                          {pokemon.height}
                        </Text>
                      </Stack>
                      <Stack direction={"row"}>
                        <Text fontSize={{ sm: "small", md: "large" }}>
                          Movimientos :{" "}
                        </Text>
                        <Text fontSize={{ sm: "small", md: "large" }}>
                          {pokemon.moves?.length}
                        </Text>
                      </Stack>
                      <Stack direction={"row"}>
                        <Text fontSize={{ sm: "small", md: "large" }}>
                          Tipos:
                        </Text>
                        <HStack>
                          <Stack direction={"column"}>
                            {pokemon.types?.map((type, index: number) => (
                              <Badge
                                fontSize={{ sm: "small", md: "large" }}
                                key={index}
                              >
                                <Text fontSize={{ sm: "small", md: "large" }}>
                                  {type.type?.name!}
                                </Text>
                              </Badge>
                            ))}
                          </Stack>
                        </HStack>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
                <Button
                  width={"100%"}
                  backgroundColor={"#63b3ed"}
                  _hover={{ bg: "#3182ce", borderColor: "black" }}
                  onClick={() => handleFreePokemon(pokemon.id)}
                >
                  Free Pokemon
                </Button>
              </Stack>
            </>
          ))}
        </SimpleGrid>
        <Modal {...pokemonDataModal} isCentered size={"xl"}>
          <ModalOverlay />
          <ModalContent>
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
    )
  );
};

export default Catched;
