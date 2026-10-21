import { Favorite } from "@prisma/client";

export type FavoriteCreateRepoDto = Omit<Favorite, 'id' | 'createdAt'>;
export type FavoriteCreateServiceDto = Omit<Favorite, 'id' | 'createdAt'>;
export type FavoriteDeleteServiceDto = Omit<Favorite, 'id' | 'createdAt'>;