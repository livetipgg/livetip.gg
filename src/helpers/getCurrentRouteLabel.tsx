import { routes } from "@/routers/routes";

export const getCurrentRouteLabel = (pathname: string) => {
  console.log("Pathname: " + pathname);

  const currentRoute = Object.values(routes).find(
    (route) => route.path === pathname
  );

  console.log(currentRoute);
  return currentRoute ? currentRoute.label : "Not Found";
};
