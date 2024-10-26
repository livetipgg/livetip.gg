import { authState } from "@/features/auth/states/atoms";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function Authenticated(props: P) {
    const { user } = useRecoilValue(authState);
    if (!user.token) {
      return <Navigate to="/" />;
    }

    return <Component {...props} />;
  };
}
