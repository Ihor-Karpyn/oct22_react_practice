import { Users } from './Users';

export type Categories = {
  id: number,
  title: string,
  icon: string,
  ownerId: number,
  user: Users[] | null
};
