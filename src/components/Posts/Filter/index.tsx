import { FilterDate, FilterRoot, FilterSearchPost, FilterSearchUserCards, FilterSearchUserFavoritesCard, FilterSearchUserInput } from "./FilterPattern";

export const Filter = {
  Root: FilterRoot,
  SearchPost: FilterSearchPost,
  SearchUser: {
    Input: FilterSearchUserInput,
    Cards: FilterSearchUserCards,
    FavoritesCard: FilterSearchUserFavoritesCard
  },
  Date: FilterDate
}