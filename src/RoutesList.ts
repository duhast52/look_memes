import { lazyComponents } from "src/pages/lazyComponents";
import { webAppRoutes } from "src/constants";

export const authRoutes = [
  { path: webAppRoutes.base, exact: true, Component: lazyComponents.HomePage },
  { path: webAppRoutes.newMeme, exact: true, Component: lazyComponents.NewMeme },
  { path: `${webAppRoutes.newMeme}/:meme_slug`, exact: true, Component: lazyComponents.NewMeme },
];

export const publicRoutes = [{ path: webAppRoutes.auth, exact: true, Component: lazyComponents.Auth }];
