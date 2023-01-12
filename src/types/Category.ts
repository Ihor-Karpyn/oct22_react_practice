import { User } from './User';

export interface Category {
  id?: number | undefined,
  title?: string | undefined,
  icon?: string | undefined,
  userId?: number | undefined,
  user?: User | null,
}
