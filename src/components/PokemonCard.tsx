import { Pokemon } from "@/models";
import {
  Stack,
  Text,
  Image,
  HStack,
  Badge,
  AspectRatio,
  Box,
} from "@chakra-ui/react";

interface Props extends Pokemon {}

export const PokemonCard: React.FC<Props> = (pokemon: Props) => {
  console.log(pokemon);
  return (
    <Stack
      spacing="4"
      boxShadow="xl"
      p="5"
      w="full"
      borderRadius="xl"
      alignItems="center"
      width={300}
      display={"flex"}
    >
      <Box backgroundColor={"#E3E4E5"} width={"100%"}>
        <AspectRatio w="full" ratio={1}>
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
          />
        </AspectRatio>
        <Text textAlign="center" textTransform="capitalize">
          {pokemon.name}
        </Text>
      </Box>
      <HStack>
        {pokemon.types?.map((type) => (
          <Badge size="xs" key={type.slot}>
            {type.type.name}
          </Badge>
        ))}
      </HStack>
    </Stack>
  );
};
