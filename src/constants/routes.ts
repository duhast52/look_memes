enum RouteKeys {
  auth = "auth",
  new_meme = "new_meme",
}

const BASE_ROUTE = "/";

const PublicRoutesList = {
  Auth: `${BASE_ROUTE}${RouteKeys.auth}`,
};

const AuthRoutesList = {
  CreateNewMeme: `${BASE_ROUTE}${RouteKeys.new_meme}`,
};

export const webAppRoutes = {
  base: BASE_ROUTE,
  auth: `${PublicRoutesList.Auth}`,
  newMeme: `${AuthRoutesList.CreateNewMeme}`,
};
