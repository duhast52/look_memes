import { DefaultLazyResult, LazyComponentModel } from "../@types";
import React from "react";

const Auth = React.lazy(
  (): LazyComponentModel => import("./Auth").then((m): DefaultLazyResult => ({ default: m.Auth }))
);

const HomePage = React.lazy(
  (): LazyComponentModel => import("./HomePage").then((m): DefaultLazyResult => ({ default: m.HomePage }))
);

const NewMeme = React.lazy(
  (): LazyComponentModel => import("./NewMeme").then((m): DefaultLazyResult => ({ default: m.NewMeme }))
);

export const lazyComponents = {
  Auth,
  HomePage,
  NewMeme,
};
