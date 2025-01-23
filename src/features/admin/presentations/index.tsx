import { authState } from "@/features/auth/states/atoms";
import { withLayout } from "@/HOC/withLayout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const Admin = ({ children }: { children?: React.ReactNode }) => {
  const { user } = useRecoilValue(authState);
  const navigate = useNavigate();

  const isAdmin = user.id === 3;

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);

  return <div>{children}</div>;
};

const AdminPage = withLayout(Admin, "LiveTip - Painel Admin");
export default AdminPage;
