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
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";

interface Props extends Pokemon {}

export const PokemonData: React.FC<Props> = (pokemon) => {
  const [catched, setCatched] = useState<boolean>(false);

  const [showDataCached, setShowDataCached] = useState<boolean>(false);

  const router = useRouter();

  React.useEffect(() => {
    const getCatchedPokemon = async () => {
      try {
        const res = await axios.get(`https://apirestpoke.onrender.com/catchedsPokemons/${pokemon.id}`);
        if (res.status === 200) {
          setCatched(res.data);
          setShowDataCached((prev) => res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCatchedPokemon();
  }, [pokemon, catched]);

  const handleCatchPokemon = async () => {
    const body = {
      id: pokemon.id,
      pokeData: pokemon,
    };
    try {
      const res = await axios.post("https://apirestpoke.onrender.com/pokemon", body.pokeData, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Expose-Headers": "Content-Length",
        },
      });
      if (res.status === 200) {
        router.push("/catched");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack direction={"column"}>
      <Stack spacing="5" pb="5" width={"100%"} direction={"row"}>
        <Stack spacing="5" position="relative" width={"60%"}>
          {showDataCached && catched && router.pathname !== "/catched" && (
            <Box display={"flex"} position="relative" top={0} zIndex="99999">
              <Checkbox defaultChecked={catched} disabled>
                Catched
              </Checkbox>
            </Box>
          )}
          <AspectRatio width="full" ratio={1} height={"full"}>
            <Image
              objectFit="contain"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
              alt="pokemon"
            />
          </AspectRatio>
          <Stack direction="column" spacing="5">
            <Stack direction={"row"}>
              <Text fontSize="sm">Weight : </Text>
              <Text>{pokemon.weight}</Text>
            </Stack>
            <Stack direction={"row"}>
              <Text fontSize="sm">Height : </Text>
              <Text>{pokemon.height}</Text>
            </Stack>
            <Stack direction={"row"}>
              <Text fontSize="sm">Movimientos : </Text>
              <Text>{pokemon.moves.length}</Text>
            </Stack>
            <Stack flexDirection={"row"}>
              <Text fontSize="sm">Tipos : </Text>
              <HStack>
                {pokemon.types?.map((type, index: number) => (
                  <Badge key={index}>{type.type?.name!}</Badge>
                ))}
              </HStack>
            </Stack>
          </Stack>
        </Stack>

        <Stack spacing="5" p="5" bg="gray.100" borderRadius="xl" width={"40%"}>
          {pokemon.stats?.map(
            (
              stat: {
                base_stat: number;
                effor: number;
                stat: { name: string; url: string };
              },
              index: number
            ) => (
              <Stack key={index}>
                <Text fontSize="xs">{stat.stat.name!}</Text>
                <Progress
                  bg="gray.300"
                  borderRadius="full"
                  value={Number(stat.base_stat)}
                />
              </Stack>
            )
          )}
        </Stack>
      </Stack>
      <Button
        display={catched ? "none" : "flex"}
        disabled={catched}
        backgroundColor={catched ? "grey" : "#63b3ed"}
        _hover={{ bg: catched ? "grey" : "#3182ce", borderColor: "black" }}
        onClick={handleCatchPokemon}
      >
        Catch Pokemon
      </Button>
    </Stack>
  );
};
