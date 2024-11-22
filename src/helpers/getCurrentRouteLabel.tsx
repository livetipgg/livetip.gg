import { routes } from "@/routers/routes";

export const getCurrentRouteLabel = (pathname: string) => {
  const currentRoute = Object.values(routes).find(
    (route) => route.path === pathname
  );

  return currentRoute ? currentRoute.label : "Not Found";
};
