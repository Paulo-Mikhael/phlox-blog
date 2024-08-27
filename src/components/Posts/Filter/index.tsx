import { FilterDate, FilterRoot, FilterSearchPost, FilterSearchUserCards, FilterSearchUserInput } from "./FilterPattern";

export const Filter = {
  Root: FilterRoot,
  SearchPost: FilterSearchPost,
  SearchUser: {
    Input: FilterSearchUserInput,
    Cards: FilterSearchUserCards
  },
  Date: FilterDate
}