import { Categories } from './Categories';

export type Products = {
  id: number,
  name: string,
  categoryId: number,
  category: Categories[] | null
};
