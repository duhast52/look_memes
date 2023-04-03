import { PlainObject } from "@src/models/plainObject";

export * from "./appConfig";
export * from "./lazyLoad";
export * from "./react-app-env";

declare global {
  const PKG_NAME: string;
  const PKG_VERSION: string;

  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
    __REDUX_DEVTOOLS_EXTENSION__: any;
    dataLayer: any[];
    _hsq: Array<(string | PlainObject)[]>;
  }
}
