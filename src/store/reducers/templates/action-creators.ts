import { TemplatesActionEnum, SetTemplatesAction, SetIsLoadingAction } from "./types";
import { ICategory } from "../../../models/ICategory";
import { ITemplate } from "src/models/ITemplate";

export const TemplatesActionCreators = {
  setTemplates: (template: ITemplate[]): SetTemplatesAction => ({
    type: TemplatesActionEnum.SET_TEMPLATES_ARRAY,
    payload: template,
  }),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: TemplatesActionEnum.SET_IS_LOADING, payload }),
};
