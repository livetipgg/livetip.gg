// import { authController } from "@/features/auth/states/atoms";
import { Navigate } from "react-router-dom";
// import { useRecoilValue } from "recoil";

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function Authenticated(props: P) {
    // const { isAuthenticated } = useRecoilValue(authController);
    const isAuthenticated = true;
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }

    return <Component {...props} />;
  };
}
