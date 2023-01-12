import { Categories } from './Categories';
import { Users } from './Users';

export type Prep = {
  id: number,
  name: string,
  categotyId: Categories,
  owner: Users,
};
