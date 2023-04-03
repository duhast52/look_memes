import { CategoriesActionEnum, SetCategoriesAction, SetIsLoadingAction, SetOtherCategoryAction } from "./types";
import { ICategory } from "../../../models/ICategory";

export const CategoriesActionCreators = {
  setCategories: (category: ICategory[]): SetCategoriesAction => ({
    type: CategoriesActionEnum.SET_CATEGORIES_ARRAY,
    payload: category,
  }),
  setOtherCategory: (otherCategory: ICategory): SetOtherCategoryAction => ({
    type: CategoriesActionEnum.SET_OTHER_CATEGORY,
    payload: otherCategory,
  }),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: CategoriesActionEnum.SET_IS_LOADING, payload }),
};
