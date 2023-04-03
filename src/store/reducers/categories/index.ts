import { CategoriesAction, CategoriesActionEnum, CategoriesState } from "./types";

const initialState: CategoriesState = {
  isLoading: false,
  categoriesArray: [
    {
      name: "Popular",
      count: 5,
      isShow: true,
      id: "1",
    },
    {
      name: "New",
      count: 3,
      isShow: true,
      id: "2",
    },
  ],
  otherCategory: {
    name: "Other",
    count: 4,
    isShow: true,
    id: "5",
  },
};

export default function categoriesReducer(state = initialState, action: CategoriesAction): CategoriesState {
  switch (action.type) {
    case CategoriesActionEnum.SET_CATEGORIES_ARRAY:
      return { ...state, categoriesArray: action.payload, isLoading: false };
    case CategoriesActionEnum.SET_OTHER_CATEGORY:
      return { ...state, otherCategory: action.payload, isLoading: false };
    case CategoriesActionEnum.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}
