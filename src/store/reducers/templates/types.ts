import { ITemplate } from "src/models/ITemplate";

export interface TemplatesState {
  templatesArray: ITemplate[];
  isLoading: boolean;
}

export enum TemplatesActionEnum {
  SET_TEMPLATES_ARRAY = "SET_TEMPLATES_ARRAY",
  SET_IS_LOADING = "SET_IS_LOADING",
}
export interface SetTemplatesAction {
  type: TemplatesActionEnum.SET_TEMPLATES_ARRAY;
  payload: ITemplate[];
}
export interface SetIsLoadingAction {
  type: TemplatesActionEnum.SET_IS_LOADING;
  payload: boolean;
}

export type TemplatesAction = SetTemplatesAction | SetIsLoadingAction;
