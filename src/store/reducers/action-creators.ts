import { AuthActionCreators } from "./auth/action-creators";
import { CategoriesActionCreators } from "./categories/action-creators";
import { TemplatesActionCreators } from "./templates/action-creators";

export const allActionCreators = {
  ...AuthActionCreators,
  ...CategoriesActionCreators,
  ...TemplatesActionCreators,
};
