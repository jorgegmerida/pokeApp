export interface Pokemon {
  abilities: Array<{}>;
  base_experience: number;
  forms: Array<{}>;
  game_indices: Array<{}>;
  height: number;
  held_items: Array<{}>;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Array<{}>;
  name: string;
  order: number;
  past_abilities: Array<{}>;
  past_types: Array<{}>;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
  };
  other: any;
  versions: any;
  stats: Array<{}>;
  types: Array<{ slot: number; type: { name: string; url: string } }>;
  weight: number;
}

export interface PokemonArray{
  catchedPokemon: Pokemon[]
}
