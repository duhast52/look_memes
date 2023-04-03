import { ICategory } from "../../../models/ICategory";

export interface CategoriesState {
  categoriesArray: ICategory[];
  otherCategory: ICategory;
  isLoading: boolean;
}

export enum CategoriesActionEnum {
  SET_CATEGORIES_ARRAY = "SET_CATEGORIES_ARRAY",
  SET_OTHER_CATEGORY = "SET_OTHER_CATEGORY",
  SET_IS_LOADING = "SET_IS_LOADING",
}
export interface SetCategoriesAction {
  type: CategoriesActionEnum.SET_CATEGORIES_ARRAY;
  payload: ICategory[];
}
export interface SetOtherCategoryAction {
  type: CategoriesActionEnum.SET_OTHER_CATEGORY;
  payload: ICategory;
}
export interface SetIsLoadingAction {
  type: CategoriesActionEnum.SET_IS_LOADING;
  payload: boolean;
}

export type CategoriesAction = SetCategoriesAction | SetIsLoadingAction | SetOtherCategoryAction;
